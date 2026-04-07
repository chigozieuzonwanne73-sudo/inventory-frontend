import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../../shared/material-imports';

@Component({
  selector: 'app-product',
  standalone: true,
  // imports: [CommonModule, MatButtonModule],
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, NgIf, CommonModule, MatButtonModule],

  template: `
   <h2 mat-dialog-title>Product Details</h2>

<mat-dialog-content>
    <div class="container">
        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col gap-4 p-4">
            <p-skeleton height="3rem" />
            <p-skeleton height="2rem" />
            <p-skeleton height="2rem" />
            <p-skeleton height="10rem" />
        </div>

        <!-- Product Details -->
        <mat-card *ngIf="!isLoading && product" class="p-4">
            <div id="product-details">
                <!-- Product Info -->
                <div class="product-info mb-6">
                    <h3 class="text-2xl font-bold mb-2">{{ product.name }}</h3>
                    <p class="text-lg text-gray-600 mb-2">Category: {{ product.categoryName || product.category }}</p>
                    <p class="text-xl font-semibold text-primary mb-2">Price: £{{ product.price }}</p>
                    <p class="text-gray-700" *ngIf="product.description">{{ product.description }}</p>
                </div>

                <mat-divider class="mb-6"></mat-divider>

                <!-- Inventory Details -->
                <div class="inventory-section">
                    <h4 class="text-xl font-semibold mb-4">Inventory Details</h4>

                    <!-- If product has inventory items -->
                    <div class="item-table mb-6" *ngIf="product.inventory && product.inventory.length > 0">
                        <mat-table [dataSource]="product.inventory" class="">
                            <!-- Number Column -->
                            <ng-container matColumnDef="Number">
                                <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
                                <mat-cell *matCellDef="let element; let i = index">
                                    {{ i + 1 }}
                                </mat-cell>
                            </ng-container>

                            <!-- Shop Name Column -->
                            <ng-container matColumnDef="Shop Name">
                                <mat-header-cell *matHeaderCellDef> Shop Name </mat-header-cell>
                                <mat-cell *matCellDef="let element"> {{ element.shopName || element.shop }} </mat-cell>
                            </ng-container>

                            <!-- Stock Quantity Column -->
                            <ng-container matColumnDef="Stock Quantity">
                                <mat-header-cell *matHeaderCellDef> Stock Quantity </mat-header-cell>
                                <mat-cell *matCellDef="let element"> {{ element.stockQuantity || element.quantity }}
                                </mat-cell>
                            </ng-container>

                            <mat-header-row *matHeaderRowDef="itemTableColumn"></mat-header-row>
                            <mat-row *matRowDef="let row; columns: itemTableColumn"></mat-row>
                        </mat-table>
                    </div>

                    <!-- If no inventory items -->
                    <div *ngIf="!product.inventory || product.inventory.length === 0"
                        class="text-center p-4 text-gray-500">
                        No inventory data available for this product
                    </div>

                    <!-- Total Stock Summary (if available) -->
                    <div class="total-stock mt-4" *ngIf="product.totalStock !== undefined">
                        <p class="text-lg"><strong>Total Stock:</strong> {{ product.totalStock }} units</p>
                    </div>
                </div>
            </div>
        </mat-card>

        <!-- Error State -->
        <div *ngIf="!isLoading && !product" class="text-center p-4">
            <p class="text-red-500">Failed to load product details</p>
        </div>
    </div>
</mat-dialog-content>

<mat-dialog-actions align="end">
    <button mat-button (click)="close()">Close</button>
</mat-dialog-actions>
  `
})
// export class ProductComponent {
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: { product: any },
//     private dialogRef: MatDialogRef<ProductComponent>
//   ) { }

//   close() {
//     this.dialogRef.close();
//   }
// }

export class ProductComponent implements OnInit, OnDestroy {
  isLoading = false;
  product: any = null;

  private destroy$ = new Subject<void>();

  itemTableColumn: string[] = [
    'Number',
    'Shop Name',
    'Stock Quantity',
  ];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    console.log('Product data:', this.data);
    // Check if product data is passed with an ID to fetch from API
    if (this.data?.product?.productId) {
      this.getProduct(this.data.product.productId);
    } else if (this.data?.product) {
      // If full product data is passed, use it directly
      this.product = this.data.product;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProduct(productId: string) {
    this.isLoading = true;
    this.productService.getProduct(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(' Single Product response:', response);
          // Handle response based on API structure
          this.product = response.data || response;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
