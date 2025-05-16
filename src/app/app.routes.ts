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
        path: 'aqm/amendment-request',
        loadComponent: () => import('./Component/aqm/aqm.component').then(m => m.AQMComponent)
    },
    {
        path: 'aqm/popupdetails',
        loadComponent: () => import('./Component/popupdetails/popupdetails.component').then(m => m.PopupdetailsComponent)
    },
    {
        path: 'aqm/amendment-pending',
        loadComponent: () => import('./Component/mr-pending-list-for-approval/mr-pending-list-for-approval.component').then(m => m.MRPendingListForApprovalComponent)
    },
    {
        path: 'dqm/amendment-request',
        loadComponent: () => import('./Component/dqm/dqm.component').then(m => m.DqmComponent)
    },
    
   
];
