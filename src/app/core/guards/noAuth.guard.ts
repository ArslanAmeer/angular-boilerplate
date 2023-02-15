import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {switchMap} from 'rxjs/operators';
import {GetUserTypeRoute} from '@core/utils/custom-user-type-routes';
import {UserType} from '@core/constants/users.constant';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanMatch {
  /**
   * Constructor
   *
   * @param {AuthService} _authService
   * @param {Router} _router
   */
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._check();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  /**
   * Can Match
   *
   * @param route
   * @param segments
   */
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._check();
  }

  /**
   * Check the authenticated status
   *
   * @private
   */
  private _check(): Observable<boolean> {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated: boolean) => {

          // If the user is authenticated...
          if (authenticated) {


            const userRoute = GetUserTypeRoute(this._authService.getUserType() ?? UserType.USER);

            // Redirect to the root
            this._router.navigate([userRoute]).then();

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }
}
