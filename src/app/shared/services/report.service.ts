import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface SalesReportRequest {
    dateFrom?: string;
    dateTo?: string;
    shopId?: string;
    interval?: string;
}

export interface TopProductsRequest {
    dateFrom?: string;
    dateTo?: string;
    shopId?: string;
    limit?: number;
}

export interface OverallSalesReportResponse {
    totalSales: number;
    totalTransactions: number;
    totalItemsSold: number;
    shopBreakdown: ShopSalesReportResponse[];
}

export interface ShopSalesReportResponse {
    shopId: string;
    shopName: string;
    totalSales: number;
    totalTransactions: number;
    periodBreakdown: SalesReportResponse[];
}

export interface SalesReportResponse {
    period: string;
    totalSales: number;
    totalTransactions: number;
    totalItemsSold: number;
}

export interface TopProductResponse {
    productId: string;
    productName: string;
    totalSold: number;
    totalRevenue: number;
}

export interface SalesReportRequest {
    dateFrom?: string;
    dateTo?: string;
    shopId?: string;
    interval?: string; // 'daily', 'weekly', 'monthly', 'yearly'
}

export interface TopProductsRequest {
    dateFrom?: string;
    dateTo?: string;
    shopId?: string;
    limit?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        private http: HttpClient
    ) { }

    public getOverallSalesReport(request: SalesReportRequest) {
        const params: string[] = [];

        const queryString = params.length > 0 ? '?' + params.join('&') : '';

        return this.http
            .post(`${environment.apiURL}/api/Report/GetOverallSalesReport`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public getTopProducts(request: TopProductsRequest) {
        const params: string[] = [];
        const queryString = params.length > 0 ? '?' + params.join('&') : '';

        return this.http
            .post(`${environment.apiURL}/api/Report/GetTopProducts`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public getSalesByPeriod(request: SalesReportRequest) {
        const params: string[] = [];

        const queryString = params.length > 0 ? '?' + params.join('&') : '';

        return this.http
            .post(`${environment.apiURL}/api/Report/GetSalesByPeriod`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public downloadOverallSalesReportPdf(request: SalesReportRequest): Observable<Blob> {
        return this.http.post(`${environment.apiURL}/api/Report/OverallSales/Pdf`, request, {
            responseType: 'blob'
        });
    }

    public downloadTopProductsPdf(request: TopProductsRequest): Observable<Blob> {
        return this.http.post(`${environment.apiURL}/api/Report/TopProducts/Pdf`, request, {
            responseType: 'blob'
        });
    }

    public downloadSalesByPeriodPdf(request: SalesReportRequest): Observable<Blob> {
        return this.http.post(`${environment.apiURL}/api/Report/SalesByPeriod/Pdf`, request, {
            responseType: 'blob'
        });
    }

    public downloadPdfFile(blob: Blob, fileName: string): void {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
    }
}