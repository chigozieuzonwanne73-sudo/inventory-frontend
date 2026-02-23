import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NewCashier, NewUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    public getAllUsers() {
        return this.http
            .get(`${environment.apiURL}/api/User/GetAllUsers`)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }

    public createUser(user: NewUser) {
        return this.http
            .post(`${environment.apiURL}/api/User/AddUser`, user)
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

    public addCashier(user: NewCashier) {
        return this.http
            .post(`${environment.apiURL}/api/Actor/AddActor`, user)
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

    public deleteCashier(cashierId: string) {
        return this.http
            .delete(`${environment.apiURL}/api/Actor/DeleteActor/${cashierId}`)
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

    public getAllCashiers() {
        return this.http
            .get(`${environment.apiURL}/api/Actor/GetAllActors`)
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