import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';

import { Cart, CartItem } from '../../../shared/models/cart.model';
import { AddToCartRequest, CheckoutService } from '../../../shared/services/checkout.service';
import { MessageService } from 'primeng/api';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../shared/services/user.service';
import { Cashier } from '../../../shared/models/user.model';

@Component({
  selector: 'app-checkout',
  imports: [...allMaterialModules, RouterModule, DatePipe, NgClass, PerfectScrollbarModule, SkeletonModule, NgIf, ReactiveFormsModule, FormsModule, DropdownModule, MatRippleModule, ToastModule, RippleModule, FormsModule, ReactiveFormsModule,],
  providers: [MessageService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})


export class CheckoutComponent implements OnInit {
  public checkoutForm: FormGroup;
  public checkoutFormAlt: UntypedFormGroup;
  cartId: string;
  public hasAltAddress: boolean;


  public total: number;
  public subTotal: number;
  public shipping: any = 'Free';
  public paymentMethod: string;
  placingOrder: boolean = false;


  public cart: Cart = {} as Cart;
  cashiers: Cashier[];
  public cartItem: AddToCartRequest = {} as AddToCartRequest;
  private messageService = inject(MessageService);

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private userService: UserService,
    private auth: JwtAuthService,
    private router: Router
  ) {

    this.checkoutForm = this.fb.group({
      cartId: [this.cart.cartId, Validators.required],
      customerName: [''],
      customerEmail: [''],
      actor: ['', Validators.required],
      paymentReference: [null]
    })
  }

  ngOnInit() {
    const user = this.auth.getUser();
    this.getCart(user.userId);
    this.getCashiers();

    // assuming onQuantityChange relies on cart being loaded, 
    // it probably shouldn't be called here until cart is fetched, 
    // but preserving original logic structure for now or moving it to subscribe
  }
  onQuantityChange() {
    this.subTotal = 0;
    this.cart.items.forEach(item => {
      this.subTotal += (item.unitPrice * item.quantity)
    })
    this.total = this.subTotal;
  }
  getCart(userId: string) {
    this.checkoutService
      .getCart(userId)
      .subscribe(data => {
        console.log("cart", data);
        this.cart = data.data;
        this.checkoutForm.controls['cartId'].setValue(data.data.cartId);
        this.onQuantityChange();
      })
  }

  getCashiers() {
    this.userService
      .getAllCashiers()
      .subscribe(data => {
        console.log("cashiers", data.data);
        this.cashiers = data.data;
      })
  }


  placeOrder() {
    console.log(this.checkoutForm.value);
    this.placingOrder = true;
    this.checkoutService
      .confirmCheckout(this.checkoutForm.value)
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Checkout Successful',
              detail: res.message
            });

            setTimeout(() => {
              this.router.navigateByUrl("/cashier/products/all");
            }, 1500);
          } else {
            console.log("res", res);
            this.messageService.add({
              severity: 'error',
              summary: 'Checkout failed',
              detail: res.error.message
            });
            this.placingOrder = false;
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
          this.placingOrder = false;
        }
      })
  }

}
