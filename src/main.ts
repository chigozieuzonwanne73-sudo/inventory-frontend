import { appConfig } from './app/app.config';

  import { enableProdMode, importProvidersFrom } from '@angular/core';
  import { bootstrapApplication } from '@angular/platform-browser';
  import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
  import { TranslateHttpLoader } from '@ngx-translate/http-loader';
  
  import { AppComponent } from './app/app.component';
  import { environment } from './environments/environment';

  
  // AoT requires an exported function for factories
  export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }
  
  if (environment.production) {
    enableProdMode();
  }
  
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));