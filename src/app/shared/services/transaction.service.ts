import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface TransactionFilterQuery {
    shopId?: string;
    pageNumber?: number;
    pageSize?: number;
    querySearch?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(
        private http: HttpClient
    ) { }

    public getAllTransactions(filter: TransactionFilterQuery) {
        const params: string[] = [];

        if (filter.shopId) {
            params.push(`ShopId=${filter.shopId}`);
        }
        if (filter.pageNumber !== undefined) {
            params.push(`PageNumber=${filter.pageNumber}`);
        }
        if (filter.pageSize !== undefined) {
            params.push(`PageSize=${filter.pageSize}`);
        }
        if (filter.querySearch) {
            params.push(`QuerySearch=${filter.querySearch}`);
        }
        if (filter.status) {
            params.push(`Status=${filter.status}`);
        }
        if (filter.dateFrom) {
            params.push(`DateFrom=${filter.dateFrom}`);
        }
        if (filter.dateTo) {
            params.push(`DateTo=${filter.dateTo}`);
        }

        const queryString = params.length > 0 ? '?' + params.join('&') : '';

        return this.http
            .get(`${environment.apiURL}/api/Transaction/GetAllTransactions${queryString}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public getTransaction(transactionId: string) {
        return this.http
            .get(`${environment.apiURL}/api/Transaction/GetTransaction?transactionId=${transactionId}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }
}
