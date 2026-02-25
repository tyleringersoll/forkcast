import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./containers/repo-list/repo-list.component').then(m => m.RepoListComponent) },
  { path: '**', redirectTo: '' },
];
