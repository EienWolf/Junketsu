import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../mytheme';
import { routes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({
        // paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
    ),
    provideHttpClient(),
    provideTranslateService(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
  ],
};
