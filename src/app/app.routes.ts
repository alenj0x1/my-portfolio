import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '@alemndev - home'
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: '@alemndev - error'
  }
];
