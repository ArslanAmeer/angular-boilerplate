import { Routes } from '@angular/router';

export const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
