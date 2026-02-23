import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/guards/auth.guard';
import { AppConfirmService } from './shared/services/app-confirm/app-confirm.service';
import { NavigationService } from './shared/services/navigation.service';
import { RoutePartsService } from './shared/services/route-parts.service';
import { ThemeService } from './shared/services/theme.service';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { JwtAuthService } from './shared/services/auth/jwt-auth.service';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true },),
  provideRouter(routes, withComponentInputBinding()),
  provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors([tokenInterceptor])),
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: Material,
      options: {
        darkModeSelector: 'great-navy-dark'
      }
    }
  }),
    RoutePartsService,
    ThemeService,
    AuthGuard,
    NavigationService,
    AppConfirmService,

  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ),

  provideAppInitializer(() => {
    const jwtAuth = inject(JwtAuthService);
    const navService = inject(NavigationService);

    const storedUser = jwtAuth.getUser();
    const storedToken = jwtAuth.getJwtToken();

    if (storedUser && storedToken && !jwtAuth.isTokenExpired()) {
      jwtAuth.user$.next(storedUser);
      navService.publishMenuByRole(storedUser.role);
    } else if (storedToken && jwtAuth.isTokenExpired()) {
      jwtAuth.signout();
    }
  }),
  ]
};
