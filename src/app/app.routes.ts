import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';


export const routes: Routes = [

    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        loadComponent: () => import('./Component/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'aqm',
        loadComponent: () => import('./Component/aqm/aqm.component').then(m => m.AQMComponent)
    },
    {
        path: 'dqm',
        loadComponent: () => import('./Component/dqm/dqm.component').then(m => m.DqmComponent)
    },
   
];
