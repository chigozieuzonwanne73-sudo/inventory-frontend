import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductComponent } from './product/product.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Catgeory } from '../../../shared/models/category';
import { Product } from '../../../shared/models/product.model';
import { MatRippleModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddProductComponent } from './add-product/add-product.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { CheckoutService } from '../../../shared/services/checkout.service';


@Component({
  selector: 'app-products',
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, DropdownModule, ToastModule,
    RippleModule,
    MatRippleModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]

})


export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterForm: FormGroup;
  isLoading = false;
  categories: Catgeory[] = [];
  products: any[] = [];
  totalProducts = 0;
  userRole: string = '';

  get isCashier(): boolean {
    return this.userRole === 'cashier';
  }


  private destroy$ = new Subject<void>();
  private messageService = inject(MessageService);


  itemTableColumn: string[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService,
    private checkoutService: CheckoutService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Initialize the filter form
    this.filterForm = this.fb.group({
      querySearch: [''],
      categoryId: [null],
      pageNumber: [1],
      pageSize: [30]
    });
  }

  ngOnInit() {
    // Load categories
    this.loadCategories();

    this.userRole = this.route.snapshot.data['role'] || '';
    this.setTableColumns();

    // Load initial products
    this.loadProducts();

    // Subscribe to search input changes with debounce
    this.filterForm.get('querySearch')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // Reset to page 1 when search changes
        this.filterForm.patchValue({ pageNumber: 1 }, { emitEvent: false });
        if (this.paginator) {
          this.paginator.pageIndex = 0;
        }
        this.loadProducts();
      });

    // Subscribe to category changes
    this.filterForm.get('categoryId')?.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // Reset to page 1 when category changes
        this.filterForm.patchValue({ pageNumber: 1 }, { emitEvent: false });
        if (this.paginator) {
          this.paginator.pageIndex = 0;
        }
        this.loadProducts();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories() {
    this.categoryService.getAllCategories({ pageNumber: 1, pageSize: 100, querySearch: '' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          const data = response.data.data || response || [];
          this.categories = Array.isArray(data) ? data : [];
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.categories = [];
        }
      });
  }

  loadProducts() {
    this.isLoading = true;
    const formValue = this.filterForm.value;

    const filter = {
      categoryId: formValue.categoryId || undefined,
      pageNumber: formValue.pageNumber,
      pageSize: formValue.pageSize,
      querySearch: formValue.querySearch || undefined
    };

    this.productService.getAllProducts(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('Products response', response);
          // Handle response - adjust based on your actual API response structure
          const data = response.data.data || response.items || response || [];
          this.products = Array.isArray(data) ? data : [];
          this.totalProducts = response.totalCount || response.total || this.products.length;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
          this.products = [];
          this.cdr.markForCheck();
        }
      });
  }

  onPageChange(event: PageEvent) {
    this.filterForm.patchValue({
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize
    }, { emitEvent: false });
    this.loadProducts();
  }

  viewProduct(product: any) {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '40vh',
      data: {
        product: product
      }
    };

    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  private setTableColumns() {
    if (this.userRole === 'cashier') {
      this.itemTableColumn = ['Name', 'Category', 'Price', 'Stock', 'Add To Cart', 'Edit Stock'];
    } else {
      // Admin or other roles might have additional columns
      this.itemTableColumn = ['Name', 'Category', 'Price', 'View'];
    }
  }


  addProduct() {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '80vh',
    };

    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.messageService.add({
        severity: 'success',
        summary: 'SUCCESS',
        detail: result.message
      });
      this.loadProducts(); // Refresh list after modification
    });
  }

  deleteProduct(product: any) {
    this.isLoading = true;
    this.productService.deleteProduct(product.productId)
      .subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'SUCCESS',
            detail: response.message
          });
          this.isLoading = false;

        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: error.error.message
          });
          this.isLoading = false;
        },
        complete: () => {
          this.loadProducts();
        }

      });
  }


  editStock(product: Product) {
    const dialogConfig: MatDialogConfig = {
      minWidth: '400px',
      data: {
        product: product
      }
    };

    const dialogRef = this.dialog.open(EditStockComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'SUCCESS',
          detail: result.message
        });
        this.loadProducts(); // Refresh the products list
      }
    });
  }

  addToCart(product: any) {
    const request = {
      cartId: null,
      productId: product.productId || product.id || product._id,
      quantity: 1,
      unitPrice: product.price || 0  // NEW: Include the product price (or 0 as default)
    };

    console.log('Adding to cart:', request);

    this.checkoutService.addToCart(request).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added to cart successfully'
        });
      },
      error: (err) => {
        console.error('Error adding to cart', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to add product to cart'
        });
      }
    });
  }

  addNewInstanceToCart(product: any) {
    const request = {
      cartId: null,
      productId: product.productId || product.id || product._id,
      quantity: 1,
      unitPrice: product.price || 0  // NEW: Include the product price (or 0 as default)
    };

    console.log('Adding to cart:', request);

    this.checkoutService.addNewInstanceToCart(request).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added to cart successfully'
        });
      },
      error: (err) => {
        console.error('Error adding to cart', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to add product to cart'
        });
      }
    });
  }
}

