import { Routes } from '@angular/router';
import { authGuard } from './Component/AppGuard/auth.guard';
import { roleGuard } from './Component/AppGuard/role.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent:() => import('./Component/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'aqm-amendment-request',
        loadComponent: () => import('./Component/aqm/aqm.component').then(m => m.AQMComponent),
        canActivate:[authGuard, roleGuard],
        data: { roles: ['MR-Office'] } 
    },
    {
        path: 'aqm-amendment-pending',
        loadComponent: () => import('./Component/aqm-pending-list-for-approval/aqm-pending-list-for-approval.component').then(m => m.AQMPendingListForApprovalComponent),
        canActivate:[authGuard, roleGuard],
        data: { roles: ['MR'] }
    },
    {
        path: 'aqm-amendment-clarification',
        loadComponent: () => import('./Component/aqm-request-for-clarification/aqm-request-for-clarification.component').then(m => m.AqmRequestForClarificationComponent),
        canActivate:[authGuard, roleGuard],
        data: { roles: ['MR-Office'] }
    },
    {
        path: 'aqm-upload-document',
        loadComponent: () => import('./Component/aqm-upload-signed-copy/aqm-upload-signed-copy.component').then(m => m.AqmUploadSignedCopyComponent),
        canActivate:[authGuard, roleGuard],
        data: { roles: ['MR-Office'] }
    },
    {
        path: 'aqm-status',
        loadComponent: () => import('./Component/aqm-status/aqm-status.component').then(m => m.AqmStatusComponent),
        canActivate:[authGuard, roleGuard],
        data: { roles: ['MR-Office', 'MR', 'DR'] }
    }
];