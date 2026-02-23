import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { allMaterialModules } from '../../../../shared/material-imports';
import { ProductService } from '../../../../shared/services/product.service';
import { JwtAuthService } from '../../../../shared/services/auth/jwt-auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-stock',
  imports: [CommonModule, ...allMaterialModules, ReactiveFormsModule, ToastModule],
  templateUrl: './edit-stock.component.html',
  styleUrl: './edit-stock.component.scss',
  providers: [MessageService]
})
export class EditStockComponent {
  stockForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any },
    private productService: ProductService,
    private authService: JwtAuthService,
    private messageService: MessageService
  ) {
    this.stockForm = this.fb.group({
      stockQuantity: [this.data.product.inventory?.[0]?.stockQuantity || 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      this.isLoading = true;
      const currentUser = this.authService.getUser();
      const shopId = currentUser.shopId;

      if (!shopId) {
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR',
          detail: 'Shop ID not found. Please contact administrator.'
        });
        this.isLoading = false;
        return;
      }

      const inventoryData = {
        productId: this.data.product.productId,
        shopId: shopId,
        stockQuantity: this.stockForm.value.stockQuantity
      };
      console.log('data:', this.data)
      console.log(inventoryData);
      this.productService.updateInventory(inventoryData)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'SUCCESS',
              detail: 'Stock updated successfully'
            });
            this.isLoading = false;
            this.dialogRef.close({ success: true, message: 'Stock updated successfully' });
          },
          error: (error) => {
            console.error('Error updating stock:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'ERROR',
              detail: 'Failed to update stock. Please try again.'
            });
            this.isLoading = false;
          }
        });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
