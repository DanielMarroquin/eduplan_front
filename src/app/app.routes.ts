import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadComponent: () => import('./views/authentication/sign-in/sign-in.component')
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/education/dashboard/dashboard.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication'
  }
];
