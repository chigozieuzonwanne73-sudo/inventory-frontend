import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportService, OverallSalesReportResponse, SalesReportRequest } from '../../../../shared/services/report.service';
import { ShopService } from '../../../../shared/services/shop.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    DropdownModule,
    ToastModule,
    SkeletonModule
  ]
})
export class SalesReportComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  reportData: OverallSalesReportResponse | null = null;
  shops: any[] = [];
  isLoading = false;
  isCashier = false;
  isGenerating = false;


  intervalOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ];

  shopColumns: string[] = ['shopName', 'totalSales', 'totalTransactions'];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private shopService: ShopService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private reportsService: ReportService,

  ) {
    this.filterForm = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      shopId: [''],
      interval: ['monthly']
    });
  }

  ngOnInit() {
    this.isCashier = this.route.snapshot.data['role'] === 'cashier';
    this.loadShops();
    this.generateReport();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadShops() {
    this.shopService.getAllShops({ pageNumber: 1, pageSize: 1000, querySearch: '' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.shops = response.data?.data || response.data || [];
        },
        error: (error) => {
          console.error('Error loading shops:', error);
        }
      });
  }

  generateReport() {
    this.isLoading = true;
    const formValue = this.filterForm.value;

    const request: SalesReportRequest = {
      dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : undefined,
      dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : undefined,
      shopId: formValue.shopId || undefined,
      interval: formValue.interval
    };

    this.reportService.getOverallSalesReport(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.reportData = response.data || response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error generating report:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'Failed to generate sales report'
          });
          this.isLoading = false;
        }
      });
  }

  // Download Overall Sales Report PDF
  downloadOverallSalesReport() {
    this.isGenerating = true;
    const formValue = this.filterForm.value;

    const request: SalesReportRequest = {
      dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : undefined,
      dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : undefined,
      shopId: formValue.shopId || undefined,
      interval: formValue.interval
    };

    this.reportsService.downloadOverallSalesReportPdf(request).subscribe({
      next: (blob) => {
        const fileName = `Overall_Sales_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        this.reportsService.downloadPdfFile(blob, fileName);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Report downloaded successfully'
        });
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error downloading report:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate PDF report'
        });
        this.isGenerating = false;
      }
    });
  }

  onFilterChange() {
    this.generateReport();
  }
}
