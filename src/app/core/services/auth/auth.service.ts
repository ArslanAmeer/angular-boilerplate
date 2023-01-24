import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {environment} from '@env/environment';
import {catchError} from 'rxjs/operators';
import {AuthUtils} from '../../helpers/auth.utils';
import jwtDecode from 'jwt-decode';
import {
  ClearStorage,
  GetRefreshToken,
  GetToken,
  GetUserType,
  RemoveAuthData,
  SetRefreshToken,
  SetToken,
  SetUserDetail,
  SetUserId,
  SetUserType
} from '@core/utils/local-storage-data';

// const baseUrl = environment.baseUrl;
const baseUrl = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private detailsUrl = `${baseUrl}/api/users/me/`;

  constructor(private http: HttpClient) {
    this._authenticated = false;
  }

  private _authenticated: boolean;

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }

  getToken(): string {
    return GetToken();
  }

  setToken(token: string): void {
    SetToken(token);
  }

  getRefreshToken(): any {
    return GetRefreshToken();
  }

  setRefreshToken(token: string): void {
    SetRefreshToken(token);
  }

  getUserType(): string {
    return GetUserType();
  }

  setUserType(user_type: string): void {
    SetUserType(user_type);
  }

  setUserId(userId: number): void {
    SetUserId(userId);
  }


  logout() {
    if (this._authenticated) {
      this.http.post(`${baseUrl}/api/logout/`, {}).subscribe({
        next: () => {
          this._authenticated = false;
          ClearStorage();
          window.location.href = '/login';
          window.location.reload();
        }
      });
    } else {
      ClearStorage();
      window.location.href = '/login';
      window.location.reload();
    }
  }

  login(data: any): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this.http.post(`${baseUrl}/api/token/`, data)
      .pipe(
        switchMap((response: any) => {
          RemoveAuthData();
          this.setToken(response.data.access);
          this.setRefreshToken(response.data.refresh);
          const decoded = jwtDecode(response.data.access);
          // @ts-ignore
          const user_type = decoded.user_type;
          this.setUserType(user_type);
          // @ts-ignore
          this.setUserId(decoded.user_id);
          this._authenticated = true;
          return of({'user_type': user_type,});
        })
      );
  }


  signInUsingToken(): Observable<any> {

    // Renew token
    return this.http.post(`${baseUrl}/api/token/refresh/`, {
      refresh: this.getRefreshToken()
    }).pipe(
      catchError((err) => {
        // Return false
        return of(false);
      }),
      switchMap((response: any) => {

        // Store the access token in the local storage
        this.setToken(response.data.access);

        // Set the authenticated flag to true
        this._authenticated = true;

        // Return true
        return of(true);
      })
    );
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.getToken()) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.getToken())) {
      return of(false);
    }
    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();

  }

  getUserDetails(): Observable<any> {
    return this.http.get(this.detailsUrl).pipe(
      switchMap((res: any) => {
        SetUserDetail(res.data);
        return of(true);
      }), catchError(() => {
        return of(false);
      }));
  }

}
