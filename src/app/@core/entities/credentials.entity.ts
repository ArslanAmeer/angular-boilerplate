import { Expose } from 'class-transformer';

export class Credentials {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;

  @Expose({ name: 'access_token' })
  token: string;

  @Expose({ name: 'expires_in' })
  expiresIn: number;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
