import { DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';
import { Router, RouterModule } from '@angular/router';
import { AddToCartRequest, CheckoutService, ModifyCartItemRequest } from '../../../shared/services/checkout.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { Cart } from '../../../shared/models/cart.model';
import { MessageService } from 'primeng/api';
import { NumbersOnlyDirective } from '../../../shared/directives/numbers-only.directive';
import { MatDialog } from '@angular/material/dialog';
import { SaveDraftDialogComponent } from './save-draft-dialog/save-draft-dialog.component';
import { CartComponent } from '../checkout/cart/cart.component';

@Component({
  selector: 'app-pos',
  imports: [...allMaterialModules, RouterModule, DatePipe, NgClass, DecimalPipe, PerfectScrollbarModule, SkeletonModule, NgIf, ReactiveFormsModule, FormsModule, MatRippleModule, ToastModule, RippleModule, NumbersOnlyDirective],
  providers: [MessageService],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})

export class PosComponent implements OnInit {
  public cart: Cart = {} as Cart;
  public cartItem: ModifyCartItemRequest = {} as ModifyCartItemRequest;
  public total: number;
  public subTotal: number;
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);

  constructor(
    private readonly checkoutService: CheckoutService,
    private auth: JwtAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.auth.getUser();
    this.getCart(user.userId);
  }

  getCart(userId: string) {
    this.checkoutService
      .getCart(userId)
      .subscribe(data => {
        console.log("cart", data);
        this.cart = data.data;
        this.onQuantityChange();
      })
  }

  removeProduct(cartItem) {
    this.checkoutService
      .removeFromCart(cartItem)
      .subscribe(res => {
        this.cart = res;
        this.onQuantityChange();
      })
  }

  onQuantityChange() {
    this.subTotal = 0;
    if (this.cart && this.cart.items) {
      this.cart.items.forEach(item => {
        this.subTotal += (item.unitPrice * item.quantity)
      })
    }
    this.total = this.subTotal
  }

  removeFromCart(item: any) {
    const request = {
      cartId: this.cart.cartId,
      cartItemId: item.id,
      quantity: null
    };

    console.log('Removing from cart:', request);

    this.checkoutService.removeFromCart(request).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product removed from cart successfully'
        });
      },
      error: (err) => {
        console.error('Error Removing from cart', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'An unexpected error occurred'
        });
      },
      complete: () => {
        this.getCart(this.auth.getUser().userId);
        this.onQuantityChange();
      }
    });
  }

  modifyCartItem(cartItem) {
    this.cartItem.cartId = this.cart.cartId;
    this.cartItem.quantity = cartItem.quantity;
    this.cartItem.cartItemId = cartItem.id;
    this.cartItem.unitPrice = cartItem.unitPrice; // NEW: include price

    this.checkoutService
      .ModifyCartItem(this.cartItem)
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Cart updated',
              detail: res.message
            });
          } else {
            console.log("res", res);
            this.messageService.add({
              severity: 'error',
              summary: 'Cart update failed',
              detail: res.error.message
            });
          }
          this.getCart(this.auth.getUser().userId);
          this.onQuantityChange();
        },
        error: (err) => {
          console.error("Error updating cart:", err);
          this.messageService.add({
            severity: 'error',
            summary: 'Cart update failed',
            detail: err.error.message || 'An unexpected error occurred'
          });
        }
      })
  }

  // NEW: Handle price modification
  modifyItemPrice(cartItem) {
    console.log('Price changed:', cartItem.unitPrice);

    // Create request with updated price
    this.cartItem.cartId = this.cart.cartId;
    this.cartItem.quantity = cartItem.quantity;
    this.cartItem.cartItemId = cartItem.id;
    this.cartItem.unitPrice = parseFloat(cartItem.unitPrice) || 0; // Ensure it's a number

    this.checkoutService
      .ModifyCartItem(this.cartItem)
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Price updated',
              detail: 'Item price updated successfully'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Price update failed',
              detail: res.error.message
            });
          }
          this.getCart(this.auth.getUser().userId);
          this.onQuantityChange();
        },
        error: (err) => {
          console.error("Error updating price:", err);
          this.messageService.add({
            severity: 'error',
            summary: 'Price update failed',
            detail: err.error.message || 'An unexpected error occurred'
          });
        }
      })
  }

  openSaveDraftDialog() {
    const dialogRef = this.dialog.open(SaveDraftDialogComponent, {
      width: '400px',
      data: { suggestedName: `Draft Order - ${new Date().toLocaleTimeString()}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveDraft(result);
      }
    });
  }

  saveDraft(draftName: string) {
    if (!this.cart || !this.cart.cartId) return;

    this.checkoutService.saveCartAsDraft({
      cartId: this.cart.cartId,
      draftName: draftName
    }).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Draft Saved',
          detail: 'Cart saved as draft successfully'
        });
        // Refresh cart (which should now be empty or new)
        this.cart = {} as Cart;

        this.getCart(this.auth.getUser().userId);
      },
      error: (err) => {
        console.error('Error saving draft:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to save draft'
        });
      }
    });
  }
}