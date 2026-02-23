import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportService, SalesReportResponse, SalesReportRequest } from '../../../../shared/services/report.service';
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
    selector: 'app-monthly-report',
    templateUrl: './monthly-report.component.html',
    styleUrl: './monthly-report.component.scss',
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
export class MonthlyReportComponent implements OnInit, OnDestroy {
    filterForm: FormGroup;
    salesData: SalesReportResponse[] = [];
    shops: any[] = [];
    isLoading = false;
    isCashier = false;
    isGenerating = false;

    periodColumns: string[] = ['period', 'totalSales', 'totalTransactions', 'totalItemsSold'];

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
            dateFrom: [null],  // Changed from '' to null for cleaner undefined handling
            dateTo: [null],
            shopId: [null],
            interval: ['monthly']
        });
    }

    ngOnInit() {
        this.isCashier = this.route.snapshot.data['role'] === 'cashier';
        this.loadShops();

        // Clear data when interval changes to prevent showing mismatched data
        this.filterForm.get('interval')?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.salesData = []; // Clear table data when interval changes
            });

        // REMOVED: auto-generate on load - let user click "Generate Report" instead
        // If you want auto-load, uncomment the line below:
        // this.generateReport();
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

        console.log('Generating report with:', request);

        this.reportService.getSalesByPeriod(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: any) => {
                    this.salesData = response.data || response || [];
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error generating report:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'ERROR',
                        detail: error.error?.message || 'Failed to generate report'
                    });
                    this.isLoading = false;
                }
            });
    }

    // Download Sales By Period Report PDF
    downloadSalesByPeriodReport() {
        this.isGenerating = true;
        const formValue = this.filterForm.value;

        const request: SalesReportRequest = {
            dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : undefined,
            dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : undefined,
            shopId: formValue.shopId || undefined,
            interval: formValue.interval
        };

        console.log('Downloading PDF with:', request);

        this.reportsService.downloadSalesByPeriodPdf(request).subscribe({
            next: (blob) => {
                const fileName = `Sales_By_Period_Report_${new Date().toISOString().split('T')[0]}.pdf`;
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
                    detail: err.error?.message || 'Failed to download report'
                });
                this.isGenerating = false;
            }
        });
    }

    onFilterChange() {
        this.generateReport();
    }

    getPeriodLabel(period: string, interval: string): string {
        if (interval === 'monthly') {
            const date = new Date(period);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        } else if (interval === 'weekly') {
            return `Week of ${period}`;
        } else if (interval === 'daily') {
            const date = new Date(period);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return period;
    }
}