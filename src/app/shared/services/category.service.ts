import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterQuery } from '../models/filter-query';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EditShop, NewShop } from '../models/shop';
import { NewUser } from '../models/user.model';
import { Catgeory } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }


    public createCategory(category: Catgeory) {
        console.log('CREATE CALLED')
        return this.http
            .post(`${environment.apiURL}/api/Category/AddCategory`, category)
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


    public updateCategory(category: Catgeory) {
        console.log('UPDATE CALLED')
        return this.http
            .post(`${environment.apiURL}/api/Category/EditCategory`, category)
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

    public getAllCategories(query: FilterQuery) {
        return this.http
            .get(`${environment.apiURL}/api/Category/GetAllCategories?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}&QuerySearch=${query.querySearch}`)
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