import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
  { path: 'dashboard', component: Dashboard },
  { path: '', component: Homepage },
];
