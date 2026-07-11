import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/home/home').then((m) => m.Home),
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found').then((m) => m.NotFound)
    }
];
