import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Observable, of, switchMap} from 'rxjs';
import {RemoveAuthData} from '@core/utils/local-storage-data';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let redirectUrl = state.url;
    return this._check(redirectUrl);
  }

  /**
   * Can Match
   *
   * @param route
   * @param segments
   */
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = localStorage.getItem('last_url') ?? '/';
    return this._check(redirectUrl, route);
  }

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @param route (optional)
   * @private
   */
  private _check(redirectURL: string, route?: Route): Observable<boolean> {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {

          // If the user is not authenticated...

          if (!authenticated) {
            // Redirect to the login page with redirect parameter
            this._router.navigate(['login'], {queryParams: {redirectURL}}).then();

            // Clear Local Storage
            RemoveAuthData();

            // Prevent the access
            return of(false);
          } else {
            const role = route?.data && route?.data['role'];
            if (role && role !== this._authService.getUserType()) {
              this._router.navigate(['/']).then();
              return of(false);
            }
          }

          // Allow the access
          // return this._authService.getUserDetails();
          return of(true);
        })
      );
  }
}
