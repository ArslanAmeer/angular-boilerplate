import { Expose } from 'class-transformer';
import { InitializableEntity } from '@core/entities/_extra/intializable.entity';

export class Credentials extends InitializableEntity {
  id = '';
  username = '';
  firstName? = '';
  lastName? = '';
  email? = '';
  password? = '';

  @Expose({ name: 'access_token' })
  token = '';

  @Expose({ name: 'expires_in' })
  expiresIn = 0;

  @Expose({ name: 'refresh_token' })
  refreshToken = '';

  roles: string[] = [];

  constructor(init?: Partial<Credentials>) {
    super(init);
    this.initEntity(init);
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
