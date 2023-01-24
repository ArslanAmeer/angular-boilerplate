import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this._authService.logout();
    return false;
  }


}
