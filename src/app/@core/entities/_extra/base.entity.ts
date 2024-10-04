import { Expose } from 'class-transformer';
import { InitializableEntity } from '@core/entities/_extra/intializable.entity';

export class BaseEntity extends InitializableEntity {
  id: number;

  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose({ name: 'updated_at' })
  updatedAt: string;

  modifiedAt: string;

  @Expose({ name: 'created_by' })
  createdBy = 0;

  constructor(init?: Partial<BaseEntity>) {
    super(init);
    this.initEntity(init);
  }
}
