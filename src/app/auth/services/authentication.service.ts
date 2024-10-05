import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CredentialsService } from '@app/auth';
import { Credentials } from '@core/entities';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
  isMobile?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly _credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const credentials: Credentials = new Credentials({
      username: 'johndoe',
      id: '',
      token: '123456',
      refreshToken: '123456',
      expiresIn: 3600,
      roles: ['admin'],
      email: 'john@email.com',
      firstName: 'John',
      lastName: 'Doe',
    });
    this._credentialsService.setCredentials(credentials, context.remember);

    return of(credentials);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<any> {
    return of(true);
  }
}
