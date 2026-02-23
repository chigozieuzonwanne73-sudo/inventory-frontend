import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterQuery } from '../models/filter-query';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EditShop, NewShop } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllShops(filter: FilterQuery) {
    return this.http
      .get(`${environment.apiURL}/api/Shop/GetAllShops?PageNumber=${filter.pageNumber}&PageSize=${filter.pageSize}&QuerySearch=${filter.querySearch}`)
      .pipe(
        map((res: any) => {
          // DON'T navigate here - let the component handle it
          // this.navigateByRole(res.user.role);   
          return res;
        }),
        catchError((error) => {
          // Return the error as an observable error
          return throwError(() => error);
        })
      );
  }

  public getShop(shopId: string) {
    return this.http
      .get(`${environment.apiURL}/api/Shop/GetShop?shopId=${shopId}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          // Return the error as an observable error
          return throwError(() => error);
        })
      );
  }

  public editShop(shop: EditShop) {
    return this.http
      .post(`${environment.apiURL}/api/Shop/EditShop`, shop)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          // Return the error as an observable error
          return throwError(() => error);
        })
      );
  }

  public createShop(shop: NewShop) {
    return this.http
      .post(`${environment.apiURL}/api/Shop/AddShop`, shop)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          // Return the error as an observable error
          return throwError(() => error);
        })
      );
  }
}
