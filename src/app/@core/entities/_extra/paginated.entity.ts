import { InitializableEntity } from '@core/entities/_extra/intializable.entity';

export class PaginatedEntity extends InitializableEntity {
  pagination: Pagination;

  constructor(values?: Partial<PaginatedEntity>) {
    super();
    this.pagination = {
      page: 1,
      pageSize: 10,
    };
    this.initEntity(values);
  }
}

export interface Pagination {
  page: number;
  pageSize: number;
  rowCount?: number;
  pageCount?: number;
}
