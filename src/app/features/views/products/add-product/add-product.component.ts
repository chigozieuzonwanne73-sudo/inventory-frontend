import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { allMaterialModules } from '../../../../shared/material-imports';
import { ProductService } from '../../../../shared/services/product.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Catgeory } from '../../../../shared/models/category';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [...allMaterialModules, SkeletonModule, DropdownModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Catgeory[] = [];
  isLoading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      productNumber: ['', Validators.required],
      price: [null],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();

    if (this.data?.product) {
      this.isEditMode = true;
      const product = this.data.product;
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        productNumber: product.productNumber,
        stockQuantity: product.inventory?.[0]?.stockQuantity || 0
      });
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories({ pageNumber: 1, pageSize: 100, querySearch: '' })
      .subscribe((response: any) => {
        const data = response.data.data || response || [];
        this.categories = Array.isArray(data) ? data : [];
      });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.isLoading = true;
    const productData = this.productForm.value;

    if (this.isEditMode) {
      // Logic for editing if needed, for now mainly adding
      // You might need a different endpoint or logic for update
      this.productService.updateProduct({ ...productData, id: this.data.product.id })
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.dialogRef.close({ message: 'Product updated successfully' });
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.isLoading = false;
          }
        });
    } else {
      this.productService.createProduct(productData)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.dialogRef.close({ message: 'Product created successfully' });
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.isLoading = false;
          }
        });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
