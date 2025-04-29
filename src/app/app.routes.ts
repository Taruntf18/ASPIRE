import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        loadComponent: () =>
          import('./Component/login/login.component').then(m => m.LoginComponent)
      },
    
];
