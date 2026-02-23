import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportService, TopProductResponse, TopProductsRequest } from '../../../../shared/services/report.service';
import { ShopService } from '../../../../shared/services/shop.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CardModule
  ]
})
export class ProductReportComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  products: TopProductResponse[] = [];
  shops: any[] = [];
  isLoading = false;
  isCashier = false;
  isGenerating = false;

  productColumns: string[] = ['productName', 'totalSold', 'totalRevenue'];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private shopService: ShopService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private reportsService: ReportService
  ) {
    this.filterForm = this.fb.group({
      dateFrom: [''],
      dateTo: [''],
      shopId: [''],
      limit: [10]
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

    const request: TopProductsRequest = {
      dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : undefined,
      dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : undefined,
      shopId: formValue.shopId || undefined,
      limit: formValue.limit
    };

    this.reportService.getTopProducts(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.products = response.data || response || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error generating report:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'Failed to generate product report'
          });
          this.isLoading = false;
        }
      });
  }

  // Download Top Products Report PDF
  downloadTopProductsReport() {
    this.isGenerating = true;

    const formValue = this.filterForm.value;

    const request: TopProductsRequest = {
      dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : undefined,
      dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : undefined,
      shopId: formValue.shopId || undefined,
      limit: formValue.limit
    };

    this.reportsService.downloadTopProductsPdf(request).subscribe({
      next: (blob) => {
        const fileName = `Top_Products_Report_${new Date().toISOString().split('T')[0]}.pdf`;
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
