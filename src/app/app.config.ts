import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthGuard } from './shared/guards/auth.guard';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';
import { AppConfirmService } from './shared/services/app-confirm/app-confirm.service';
import { NavigationService } from './shared/services/navigation.service';
import { RoutePartsService } from './shared/services/route-parts.service';
import { ThemeService } from './shared/services/theme.service';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const appConfig: ApplicationConfig = { 
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    providePrimeNG({
      theme: {
          preset: Material,
          options: {
              darkModeSelector: 'egret-navy-dark'
          }
      }
  }),
    RoutePartsService,
    ThemeService,
    AuthGuard,
    NavigationService,
    AppConfirmService,

    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true, delay: 200 }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
  ] 
};
