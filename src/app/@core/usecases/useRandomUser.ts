import { RandomUserService } from '@core/services';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { RandomUserEntity } from '@core/entities';
import { inject } from '@angular/core';

export class UseRandomUser {
  private readonly _randomUserService: RandomUserService = inject(RandomUserService);

  getAllUsers() {
    return this._randomUserService.find().pipe(map((response) => response.map((user: any) => plainToInstance(RandomUserEntity, user))));
  }
}
