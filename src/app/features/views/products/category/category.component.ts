import { DatePipe, DOCUMENT, NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMaterialModules } from '../../../../shared/material-imports';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Catgeory } from '../../../../shared/models/category';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatRippleModule } from '@angular/material/core';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-category',
  imports: [
    ...allMaterialModules,
    DatePipe,
    NgClass,
    PerfectScrollbarModule,
    SkeletonModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule,
    RippleModule,
    MatRippleModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [MessageService]
})
export class CategoryComponent implements OnInit, OnDestroy {
  showEditOption = false;
  isLoading = false;
  categoryForm: FormGroup;
  category: Catgeory | null = null;
  categoryId: string | null = null;
  isEditMode = false;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  private dialogRef = inject(MatDialogRef<CategoryComponent>);

  itemTableColumn: string[] = [
    'Number',
    'Shop Name',
    'Stock Quantity',
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DATA) public data: { category: Catgeory | null }
  ) {
    console.log('Constructor data:', data); // Debug

    this.category = data?.category || null;
    this.categoryId = this.category?.categoryId || null;

    // Determine edit mode - if category exists, it's edit mode
    this.isEditMode = !!this.category;

    console.log('Category:', this.category); // Debug
    console.log('CategoryId:', this.categoryId); // Debug
    console.log('isEditMode:', this.isEditMode); // Debug
  }

  ngOnInit() {
    this.initializeForm();
    this.document.body.classList.add('print-body-content');

    console.log('ngOnInit - isEditMode:', this.isEditMode); // Debug
  }

  ngOnDestroy() {
    this.document.body.classList.remove('print-body-content');
  }

  initializeForm() {
    console.log('imported nigga', this.category);
    this.categoryForm = this.fb.group({
      categoryId: [this.category?.id || ''],
      name: [this.category?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [this.category?.description || '', Validators.required],
    });
    if (this.category != null) {
      this.showEditOption = true;
    }

    // If editing, populate the form
    if (this.isEditMode && this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  onEditCategory() {
    this.showEditOption = !this.showEditOption;
  }

  onSubmit() {

    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const categoryData = this.categoryForm.value;

    const request = this.isEditMode
      ? this.categoryService.updateCategory(categoryData)
      : this.categoryService.createCategory(categoryData);

    request.subscribe({
      next: (response) => {
        console.log(response);

        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: `Category ${this.isEditMode ? 'updated' : 'created'} successfully`
        // });
        this.showEditOption = false;
        this.isLoading = false;

        this.dialogRef.close(response);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || `Failed to ${this.isEditMode ? 'update' : 'create'} category`
        });
        this.isLoading = false;
      }

    });
  }

  onCancel() {
    if (this.isEditMode && this.category) {
      this.categoryForm.patchValue(this.category);
    } else {
      this.resetForm();
    }
    this.showEditOption = false;
  }

  resetForm() {
    this.categoryForm.reset();
    this.categoryForm.markAsUntouched();
    this.categoryForm.markAsPristine();

    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  print() {
    window.print();
  }
}