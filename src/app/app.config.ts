// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ import this
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // ✅ fix: this enables HttpClient injection in services
  ]
};


