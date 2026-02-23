import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtAuth: JwtAuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if logged in and token is not expired
    if (this.jwtAuth.isLoggedIn()) {
      return true;
    }

    // Token missing or expired - redirect to login
    this.jwtAuth.signout();
    this.router.navigate(['/auth/signin'], {
      queryParams: { return: state.url }
    });
    return false;
  }
}