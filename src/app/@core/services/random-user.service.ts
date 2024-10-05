import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomUserService {
  constructor(private readonly _http: HttpClient) {}

  find() {
    return this._http.get('https://randomuser.me/api/').pipe(map((response: any) => response.results));
  }
}
