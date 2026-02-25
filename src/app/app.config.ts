import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reposReducer } from './store/repos.reducer';
import { themeReducer } from './store/theme.reducer';
import { ReposEffects } from './store/repos.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      repos: reposReducer,
      theme: themeReducer,
    }),
    provideEffects(ReposEffects),
  ],
};
