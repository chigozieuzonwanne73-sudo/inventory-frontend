// Create file: src/app/shared/interceptors/token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtAuth = inject(JwtAuthService);
  const token = jwtAuth.getJwtToken();

  // Skip adding token for login/public endpoints
  const isPublicEndpoint = req.url.includes('/Login') ||
    req.url.includes('/Register') ||
    req.url.includes('/ForgotPassword');

  if (token && !isPublicEndpoint) {
    // Clone the request and add authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};