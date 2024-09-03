import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadComponent: () => import('./views/authentication/sign-in/sign-in.component').then(m => m.default)
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.default),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/education/dashboard/dashboard.component').then(m => m.default)
      },
      {
        path: 'estudiantes',
        loadComponent: () => import('./views/education/students/students.component').then(m => m.default)
      },
      {
        path: 'cursos',
        loadComponent: () => import('./views/education/courses/courses.component').then(m => m.default)
      },
      {
        path: 'evaluaciones',
        loadComponent: () => import('./views/education/evaluations/evaluations.component').then(m => m.default)
      },
      {
        path: 'docentes',
        loadComponent: () => import('./views/education/teachers/teachers.component').then(m => m.default)
      },
      {
        path: 'preguntas',
        loadComponent: () => import('./views/education/questions-answers/questions-answers.component').then(m => m.default)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication'
  }
];
