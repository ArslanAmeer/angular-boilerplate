import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@app/@core/services';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CredentialsService } from '@app/auth';

const log = new Logger('AuthenticationGuard');

/* The `AlreadyLoggedCheckGuard` class is a guard in TypeScript that checks if a user is already
authenticated and redirects them to the dashboard if they are. */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedCheckGuard {
  constructor(
    private readonly _credentialsService: CredentialsService,
    private readonly _router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = this._credentialsService.isAuthenticated();
    if (isAuthenticated) {
      this._router.navigateByUrl('/dashboard');
      return false;
    } else {
      return true;
    }
  }
}

/* The AuthenticationGuard class in TypeScript is used to check if a user is authenticated and redirect
to the login page if not. */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  constructor(
    private readonly _router: Router,
    private readonly _credentialsService: CredentialsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._credentialsService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this._router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
