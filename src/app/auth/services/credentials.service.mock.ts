import { Credentials } from '@core/entities';

export class MockCredentialsService {
  credentials: Partial<Credentials> | null = {
    username: 'test',
    token: '123',
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Partial<Credentials>, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
