import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {environment} from '@env/environment.development';
import {catchError} from 'rxjs/operators';
import {AuthUtils} from '@core/helpers';
import jwtDecode from 'jwt-decode';
import {ClearStorage, GetRefreshToken, GetToken, GetUserType, RemoveAuthData, SetRefreshToken, SetToken, SetUserId, SetUserType} from '@core/utils/local-storage-data';
import {HttpClient} from '@angular/common/http';
import {UserType} from '@core/constants/users.constant';

const baseUrl = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

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
        console.log('logout');
        ClearStorage();
        window.location.href = '/login';
    }

    login(data: any): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this.http.post(`${baseUrl}/api/auth/token/`, data)
            .pipe(
                switchMap((response: any) => {
                    RemoveAuthData();
                    this.setToken(response.data.access);
                    this.setRefreshToken(response.data.refresh);
                    const decoded = jwtDecode(response.data.access);
                    // @ts-ignore
                    const user_type = decoded.user_type ?? UserType.USER;
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
        return this.http.post(`${baseUrl}/api/auth/token/refresh/`, {
            refresh: this.getRefreshToken()
        }).pipe(
            catchError((err) => {

                console.log('Error renewing token', err);

                // Return false
                return of(false);
            }),
            switchMap((response: any) => {

                if (!response) return of(false);

                console.log('Token renewed', response);

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
        if (AuthUtils.isTokenExpired(this.getToken()) && AuthUtils.isTokenExpired(this.getRefreshToken())) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it

        if (AuthUtils.isTokenExpired(this.getToken()) && !AuthUtils.isTokenExpired(this.getRefreshToken())) {
            return this.signInUsingToken();
        }

        return of(true);

    }


}
