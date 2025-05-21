import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent:() => import('./Component/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'aqm-amendment-request',
        loadComponent: () => import('./Component/aqm/aqm.component').then(m => m.AQMComponent)
    },
    {
        path: 'aqm-amendment-pending',
        loadComponent: () => import('./Component/aqm-pending-list-for-approval/aqm-pending-list-for-approval.component').then(m => m.AQMPendingListForApprovalComponent)
    },
    {
        path: 'aqm-amendment-clarification',
        loadComponent: () => import('./Component/aqm-request-for-clarification/aqm-request-for-clarification.component').then(m => m.AqmRequestForClarificationComponent)
    },
    {
        path: 'aqm-upload-document',
        loadComponent: () => import('./Component/aqm-upload-signed-copy/aqm-upload-signed-copy.component').then(m => m.AqmUploadSignedCopyComponent)
    },
];