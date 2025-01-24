import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { reqErrorInterceptor } from './core/interceptors/req-error.interceptor';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions() , withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withFetch(),withInterceptors([reqHeaderInterceptor,reqErrorInterceptor,loadingInterceptor])),
    provideClientHydration(),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule  ),
    provideToastr(),
  ],
};
