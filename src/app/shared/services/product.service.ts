import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface ProductFilterQuery {
    categoryId?: string;
    pageNumber?: number;
    pageSize?: number;
    querySearch?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    public getAllProducts(filter: ProductFilterQuery) {
        const params: string[] = [];

        if (filter.categoryId) {
            params.push(`CategoryId=${filter.categoryId}`);
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

        const queryString = params.length > 0 ? '?' + params.join('&') : '';

        return this.http
            .get(`${environment.apiURL}/api/Product/GetAllProducts${queryString}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public getProduct(productId: string) {
        return this.http
            .get(`${environment.apiURL}/api/Product/GetProduct?productId=${productId}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public deleteProduct(productId: string) {
        return this.http
            .delete(`${environment.apiURL}/api/Product/Delete?productId=${productId}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public createProduct(product: any) {
        return this.http
            .post(`${environment.apiURL}/api/Product/AddProduct`, product)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public updateProduct(product: any) {
        return this.http
            .put(`${environment.apiURL}/api/Product/UpdateProduct`, product)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public updateInventory(inventoryData: { productId: string; shopId: string; stockQuantity: number }) {
        return this.http
            .put(`${environment.apiURL}/api/Product/UpdateInventory`, inventoryData)
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
