import { Expose } from 'class-transformer';
import { InitializableEntity } from '@core/entities/extra/intializable-entity';

export class User extends InitializableEntity {
  @Expose() id?: number = 0;

  @Expose() username = '';

  @Expose({ name: 'first_name' }) firstName = '';

  @Expose({ name: 'last_name' }) lastName = '';

  @Expose() email = '';

  @Expose({ name: 'is_active' }) isActive = true;

  constructor(values?: Partial<User>) {
    super();
    this.initEntity(values);
  }
}

export class RegisterUser extends User {
  @Expose() password = '';
}
