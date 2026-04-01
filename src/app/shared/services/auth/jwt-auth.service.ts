import { inject, Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { jwtDecode } from "jwt-decode";



interface DecodedToken {
  exp: number;
  iat: number;
  role: string;
  userId: string;
  [key: string]: any;
}

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token!: string;
  isAuthenticated!: boolean;
  user: User = {};
  user$ = new BehaviorSubject<User>(this.user);
  signingIn!: boolean;
  return!: string;
  JWT_TOKEN: string;
  APP_USER = "USER";


  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,

    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.return = params["return"] || "/")
    );
  }

  public signin(email: string, password: string) {
    this.signingIn = true;
    return this.http
      .post(`${environment.apiURL}/api/User/Login`, { email, password })
      .pipe(
        map((res: any) => {
          this.setUserAndToken(res.data.token, res.data, true);
          console.log('Login response:', res);

          this.signingIn = false;

          return res;
        }),
        catchError((error) => {
          this.signingIn = false;
          console.error('Auth service error:', error.error);

          // Return the error as an observable error
          return throwError(() => error);
        })
      );
  }

  public checkTokenIsValid() {
    if (!this.getJwtToken() || this.isTokenExpired()) {
      return of(null);
    }
    const user = this.getUser();
    if (user && user.role) {
      this.user$.next(user);
      return of(user);
    }

    return of(null);
  }

  public signout() {
    this.setUserAndToken("", {}, false);
    this.router.navigateByUrl("/auth/signin");
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken() && !this.isTokenExpired();
  }

  decodeToken(): DecodedToken | null {
    const token = this.getJwtToken();
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getJwtToken();
    if (!token) return true;

    try {
      const decoded = this.decodeToken();
      if (!decoded || !decoded.exp) return true;

      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();

      return currentTime >= (expiryTime - 30000);
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }

  getTokenExpiryDate(): Date | null {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return null;

    return new Date(decoded.exp * 1000);
  }

  getTimeUntilExpiry(): number | null {
    const expiryDate = this.getTokenExpiryDate();
    if (!expiryDate) return null;

    return Math.floor((expiryDate.getTime() - Date.now()) / 1000);
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }

  getUser(): User {
    return this.ls.getItem(this.APP_USER) || {};
  }

  getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  isOwner(): boolean {
    return this.getUserRole() === 'Owner' || this.getUserRole() === 'Admin';
  }

  isCashier(): boolean {
    return this.getUserRole() === 'Cashier';
  }

  setUserAndToken(token: string, user: User, isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }

  private navigateByRole(role: string) {
    switch (role) {
      case 'Owner':
      case 'Admin':
        this.router.navigate(['/owner/reports/sales']);
        break;
      case 'Cashier':
        this.router.navigate(['/cashier/pos']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}