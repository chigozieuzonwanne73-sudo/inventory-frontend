import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface AddToCartRequest {
    cartId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface ModifyCartItemRequest {
    cartId: string;
    cartItemId: string;
    quantity: number;
    unitPrice: number;
}

export interface ConfirmCheckoutRequest {
    cartId: string,
    customerName?: string,
    customerEmail?: string,
    actor?: string,
    paymentReference?: string
}

export interface SaveCartAsDraftRequest {
    cartId: string;
    draftName: string;
}

export interface RestoreDraftCartRequest {
    draftCartId: string;
}

export interface RenameDraftCartRequest {
    draftCartId: string;
    newName: string;
}

export interface DeleteDraftCartRequest {
    draftCartId: string;
}

export interface DraftCartSummary {
    cartId: string;
    draftName: string;
    totalAmount: number;
    itemCount: number;
    createdAt: string;
    lastModified?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private http: HttpClient) { }

    public addToCart(request: AddToCartRequest) {
        return this.http.post(`${environment.apiURL}/api/Checkout/AddToCart`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public addNewInstanceToCart(request: AddToCartRequest) {
        return this.http.post(`${environment.apiURL}/api/Checkout/AddNewInstanceToCart`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public removeFromCart(request: any) {
        return this.http.post(`${environment.apiURL}/api/Checkout/RemoveFromCart`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public getCart(userId: string) {
        return this.http.get(`${environment.apiURL}/api/Checkout/GetCart?userId=${userId}`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public confirmCheckout(request: ConfirmCheckoutRequest) {
        return this.http.post(`${environment.apiURL}/api/Checkout/ConfirmCheckout`, request)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public ModifyCartItem(request: ModifyCartItemRequest): Observable<any> {
        const url = `${environment.apiURL}/api/Checkout/ModifyCartItem`;

        return this.http.put(url, request).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }
    public saveCartAsDraft(request: SaveCartAsDraftRequest): Observable<any> {
        return this.http.post(`${environment.apiURL}/api/Checkout/SaveCartAsDraft`, request)
            .pipe(
                map((res: any) => res),
                catchError((error) => throwError(() => error))
            );
    }

    public getDraftCarts(): Observable<any> {
        return this.http.get(`${environment.apiURL}/api/Checkout/GetDraftCarts`)
            .pipe(
                map((res: any) => res),
                catchError((error) => throwError(() => error))
            );
    }

    public restoreDraftCart(request: RestoreDraftCartRequest): Observable<any> {
        return this.http.post(`${environment.apiURL}/api/Checkout/RestoreDraftCart`, request)
            .pipe(
                map((res: any) => res),
                catchError((error) => throwError(() => error))
            );
    }

    public deleteDraftCart(request: DeleteDraftCartRequest): Observable<any> {
        return this.http.delete(`${environment.apiURL}/api/Checkout/DeleteDraftCart`, { body: request })
            .pipe(
                map((res: any) => res),
                catchError((error) => throwError(() => error))
            );
    }

    public renameDraftCart(request: RenameDraftCartRequest): Observable<any> {
        return this.http.put(`${environment.apiURL}/api/Checkout/RenameDraftCart`, request)
            .pipe(
                map((res: any) => res),
                catchError((error) => throwError(() => error))
            );
    }













}