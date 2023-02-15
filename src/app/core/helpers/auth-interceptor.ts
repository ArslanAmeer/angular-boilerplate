import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthUtils} from './auth.utils';
import {ClearStorage} from '@core/utils/local-storage-data';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request object
    let newReq = req.clone();

    if (this.authService.getToken() && !AuthUtils.isTokenExpired(this.authService.getToken())) {

      // Check if the request body is of FormData type and if it is, then don't add content-type header
      if (req.body instanceof FormData) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
        });
      } else {
        newReq = req.clone({
          headers: req.headers.set('content-type', 'application/json').set('Authorization', 'Bearer ' + this.authService.getToken())
        });
      }

      // check if req is PUT,PATCH or DELETE and req body has _etag then add it to headers
      if (['PUT', 'PATCH', 'DELETE'].includes(newReq.method) && newReq.body && newReq.body._etag) {
        newReq = newReq.clone({
          headers: newReq.headers.set('If-Match', req.body._etag)
        });
      }

    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {

        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {

          // Sign out
          ClearStorage();
          this.authService.authenticated = false;

          // Navigating USer to SignIn page instead of reload.
          // sometimes app stuck on infinite loop on reloading app

          // window.location.href = '/t1mgt/login';
          // location.reload();
        }

        // Catch "403 Forbidden" responses
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.authService.authenticated = false;
          this.authService.signInUsingToken().subscribe(res => {
            this.authService.authenticated = true;
            location.reload();
          }, error => {
            this.authService.logout();
          });
        }

        return throwError(error);
      })
    );

  }


}
