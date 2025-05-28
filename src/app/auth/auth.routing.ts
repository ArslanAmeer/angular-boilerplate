import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LoginComponent } from '@app/auth/login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [],
    component: LoginComponent,
    data: { title: marker('Login') },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: marker('Signup') },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: marker('Logout') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRouting {}
