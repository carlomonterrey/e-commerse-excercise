import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor, progresivebarInterceptor } from './interceptors/main.interceptor';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),provideHttpClient(withFetch(),withInterceptors([headerInterceptor,progresivebarInterceptor])), provideClientHydration(),]
};
