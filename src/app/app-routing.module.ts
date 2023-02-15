import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnderconstructionPage} from '@core/ui/pages/underconstruction/underconstruction.page';
import {DashboardPage} from '@pages/home/dashboard/dashboard.page';
import {AuthGuard} from '@core/guards/auth.guard';
import {NoAuthGuard} from '@core/guards/noAuth.guard';
import {LogoutGuard} from '@core/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'under-construction',
    pathMatch: 'full'
  },

  // -------------------- Auth Routes --------------------

  {
    path: 'auth',
    canMatch: [NoAuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'login',
    canMatch: [NoAuthGuard],
    redirectTo: 'auth/login',
  },
  {
    path: 'register',
    canMatch: [NoAuthGuard],
    redirectTo: 'auth/register',
  },
  {
    path: 'logout',
    canMatch: [LogoutGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  // -------------------- Home Routes --------------------

  {
    path: 'home',
    component: DashboardPage,
    canActivate: [AuthGuard]
  },

  // -------------------- Auxiliary Routes --------------------

  {
    path: 'under-construction',
    component: UnderconstructionPage,
  },
  {
    path: '**',
    redirectTo: 'under-construction',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
