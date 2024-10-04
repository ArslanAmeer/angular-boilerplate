import { Observable, of } from 'rxjs';

import { LoginContext } from '@auth';
import { Credentials } from '@core/entities';

export class MockAuthenticationService {
  credentials: Partial<Credentials> | null = {
    username: 'test',
    token: '123',
  };

  login(context: LoginContext): Observable<Partial<Credentials>> {
    return of({
      username: context.username,
      token: '123456',
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
