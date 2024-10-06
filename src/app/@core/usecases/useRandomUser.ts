import { RandomUserService } from '@core/services';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { RandomUserEntity } from '@core/entities';
import { inject } from '@angular/core';

/**
 * The `UseRandomUser` is responsible for fetching random users from the API.
 * It uses the `RandomUserService` to fetch the data and then maps the response to an array of `RandomUserEntity`.
 * This is an Exmaple of a usecase.
 */
export class UseRandomUser {
  private readonly _randomUserService: RandomUserService = inject(RandomUserService);

  getAllUsers() {
    return this._randomUserService.find().pipe(map((response) => response.map((user: any) => plainToInstance(RandomUserEntity, user))));
  }
}
