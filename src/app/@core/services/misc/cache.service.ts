import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CacheContent {
  data: any;
  timestamp: number;
  lastAccessed: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly _cache = new Map<string, CacheContent>();
  private readonly _inFlightRequests = new Map<string, Observable<any>>();

  /**
   * The `get` function retrieves the value associated with a specified key from the cache.
   * @param {string} key - The `get` method in the code snippet you provided takes a `key` parameter of
   * type `string`. This key is used to retrieve a value from the cache.
   * @returns The `get` method is returning the value associated with the provided `key` in the cache. If
   * there is no value associated with the key, it will return `undefined`.
   */
  get(key: string): CacheContent | undefined {
    return this._cache.get(key);
  }

  /**
   * This TypeScript function returns the size of a cache.
   * @returns The `getSize()` method is returning the size of the `_cache` property, which is a number.
   */
  getSize(): number {
    return this._cache.size;
  }

  /**
   * The `set` function in TypeScript sets a key-value pair in a cache with a timestamp and last accessed
   * time.
   * @param {string} key - The `key` parameter is a string that serves as the identifier for the data
   * being stored in the cache.
   * @param {any} data - The `data` parameter in the `set` method is used to store any type of data that
   * you want to associate with the specified key in the cache. This data can be of any JavaScript data
   * type such as string, number, object, array, etc.
   */
  set(key: string, data: any): void {
    const now = Date.now();
    this._cache.set(key, { data, timestamp: now, lastAccessed: now });
  }

  /**
   * This TypeScript function deletes a key from a cache.
   * @param {string} key - The `key` parameter is a string that represents the key of the item you want
   * to delete from the cache.
   */
  delete(key: string): void {
    this._cache.delete(key);
  }

  /**
   * The `has` function in TypeScript checks if a key exists in a cache.
   * @param {string} key - The `key` parameter in the `has` method is a string that represents the key
   * you want to check for existence in the cache.
   * @returns The `has` method is returning a boolean value, which indicates whether the key exists in
   * the cache or not.
   */
  has(key: string): boolean {
    return this._cache.has(key);
  }

  /**
   * The function `getInFlightRequest` retrieves an in-flight request based on a given key.
   * @param {string} key - The `key` parameter is a string that is used to retrieve a value from a
   * collection of in-flight requests.
   * @returns The `getInFlightRequest` method is returning an `Observable<any>` or `undefined` value
   * based on the key provided.
   */
  getInFlightRequest(key: string): Observable<any> | undefined {
    return this._inFlightRequests.get(key);
  }

  /**
   * The function `setInFlightRequest` stores an observable with a specified key in a map.
   * @param {string} key - The `key` parameter is a string that serves as a unique identifier for the
   * in-flight request.
   * @param observable - An Observable is a representation of any set of values over any amount of time.
   * It is used in reactive programming to handle asynchronous data streams.
   */
  setInFlightRequest(key: string, observable: Observable<any>): void {
    this._inFlightRequests.set(key, observable);
  }

  /**
   * The function `deleteInFlightRequest` removes a key from a Map object `_inFlightRequests`.
   * @param {string} key - The `key` parameter in the `deleteInFlightRequest` function is a string type
   * that represents the key of the request to be deleted from the `_inFlightRequests` map.
   */
  deleteInFlightRequest(key: string): void {
    this._inFlightRequests.delete(key);
  }

  /**
   * The function `evictCache` evicts the least recently accessed entry from a cache.
   * @param count - The `count` parameter is a number that represents the number of cache
   */
  evictCache(count = 1): void {
    const entries = Array.from(this._cache.entries()).sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    entries.slice(0, count).forEach(([key]) => this._cache.delete(key));
  }
}
