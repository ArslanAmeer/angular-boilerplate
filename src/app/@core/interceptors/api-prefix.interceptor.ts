import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject, takeUntil, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize } from 'rxjs/operators';
import { CredentialsService } from '@auth';

@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  private readonly _ongoingRequests = new Map<string, Subject<any>>();

  constructor(
    private readonly _credentialsService: CredentialsService,
    private readonly _translateService: TranslateService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the request has the 'noauth' header, don't add the Authorization header
    if (request.headers.get('noauth')) {
      return next.handle(request);
    }

    let headers = request.headers;
    const { token } = this._credentialsService.credentials || {};
    const currentLang = this._translateService.currentLang.substring(0, 2);

    if (token) {
      if (!(request.body instanceof FormData)) {
        headers = headers.set('content-type', 'application/json');
      }
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Accept-Language', currentLang).set('Content-Language', currentLang).set('lang', currentLang);

    request = request.clone({ headers });

    /**
     * In below piece of code If there is an ongoing request with the same method and URL than return the ongoing request instead of creating a new one
     * This is useful when the user clicks multiple times on a button that triggers a request
     */

    const requestKey = this._getRequestKey(request);

    const ongoingRequest = this._ongoingRequests.get(requestKey);
    if (ongoingRequest) {
      return ongoingRequest.asObservable();
    } else {
      const cancelSubject = new Subject<any>();
      this._ongoingRequests.set(requestKey, cancelSubject);

      return next.handle(request).pipe(
        takeUntil(cancelSubject),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this._credentialsService.setCredentials();
            window.location.href = '/login';
          }
          return throwError(error);
        }),
        finalize(() => {
          this._ongoingRequests.delete(requestKey);
          cancelSubject.complete();
        }),
      );
    }
  }

  private _getRequestKey(req: HttpRequest<any>): string {
    return `${req.method} ${req.urlWithParams}`;
  }
}
