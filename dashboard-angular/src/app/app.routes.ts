import { Routes } from '@angular/router';;
import { HomePage } from './home-page/home-page';
import { AuthorizationPage } from './authorization-page/authorization-page';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'authorization', component: AuthorizationPage},
    { path: 'admin', component: HomePage}
];
