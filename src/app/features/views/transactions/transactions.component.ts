import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TransactionService } from '../../../shared/services/transaction.service';
import { ShopService } from '../../../shared/services/shop.service';
import { SelectModule } from 'primeng/select';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryComponent } from '../products/category/category.component';
import { MessageService } from 'primeng/api';
import { InvoiceComponent } from './invoice/invoice.component';

@Component({
  selector: 'app-transactions',
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, DropdownModule, ReactiveFormsModule, SelectModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  providers: [MessageService]

})
export class TransactionsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterForm: FormGroup;
  isLoading = false;
  shops: any[] = [];
  transactions: any[] = [];
  totalTransactions = 0;
  isCashier = false;

  private destroy$ = new Subject<void>();

  // Status options for dropdown
  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  itemTableColumn: string[] = [
    'Date',
    'Shop',
    'Amount',
    'Customer',
    'Actions'
  ];

  public dialog = inject(MatDialog);
  @Inject(DOCUMENT) private document: Document


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private transactionService: TransactionService,
    private shopService: ShopService

  ) {
    // Initialize the filter form
    this.filterForm = this.fb.group({
      querySearch: [''],
      shopId: [null],
      status: [''],
      dateFrom: [null],
      dateTo: [null],
      pageNumber: [1],
      pageSize: [30]
    });
  }

  ngOnInit() {
    // Check if user is cashier
    this.route.data.subscribe(data => {
      this.isCashier = data['role'] === 'cashier';
    });

    // Load shops for dropdown
    this.loadShops();

    // Load initial transactions
    this.loadTransactions();

    // Subscribe to search input changes with debounce
    this.filterForm.get('querySearch')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resetPagination();
        this.loadTransactions();
      });

    // Subscribe to shop changes
    this.filterForm.get('shopId')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadTransactions();
      });

    // Subscribe to status changes
    this.filterForm.get('status')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadTransactions();
      });

    // Subscribe to dateFrom changes
    this.filterForm.get('dateFrom')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadTransactions();
      });

    // Subscribe to dateTo changes
    this.filterForm.get('dateTo')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resetPagination();
        this.loadTransactions();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetPagination() {
    this.filterForm.patchValue({ pageNumber: 1 }, { emitEvent: false });
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
  }

  loadShops() {
    this.shopService.getAllShops({ pageNumber: 1, pageSize: 100, querySearch: '' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('shops', response.data.data);
          const data = response.data.data || response || [];
          this.shops = response.data.data || [];
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading shops:', error);
          this.shops = [];
        }
      });
  }

  loadTransactions() {
    this.isLoading = true;
    const formValue = this.filterForm.value;

    const filter: any = {
      pageNumber: formValue.pageNumber,
      pageSize: formValue.pageSize,
    };

    if (formValue.shopId) filter.shopId = formValue.shopId;
    if (formValue.querySearch) filter.querySearch = formValue.querySearch;
    if (formValue.status) filter.status = formValue.status;
    if (formValue.dateFrom) {
      filter.dateFrom = new Date(formValue.dateFrom).toISOString();
    }
    if (formValue.dateTo) {
      filter.dateTo = new Date(formValue.dateTo).toISOString();
    }

    this.transactionService.getAllTransactions(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log(response.data.data);
          const data = response.data?.data || response.data || response.items || response || [];
          this.transactions = Array.isArray(data) ? data : [];
          this.totalTransactions = response.data?.totalCount || response.totalCount || response.total || this.transactions.length;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.isLoading = false;
          this.transactions = [];
          this.cdr.markForCheck();
        }
      });
  }

  onPageChange(event: PageEvent) {
    this.filterForm.patchValue({
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize
    }, { emitEvent: false });
    this.loadTransactions();
  }


  viewTransaction(transaction: any) {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '50vh',
      data: {
        transactionId: transaction.id || transaction.transactionId
      }
    };

    const dialogRef = this.dialog.open(InvoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
