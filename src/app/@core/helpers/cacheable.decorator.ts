import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { CacheService } from '@core/services';

/**
 * The `Cacheable` function is a TypeScript decorator that adds caching functionality to a method.
 * @requires CacheService - The `Cacheable` decorator requires the `CacheService` to be available on the target (Parent) class.
 * @param {string} cacheKey - The `cacheKey` parameter is a string that represents the key used to
 * identify the cache entry. It is combined with the serialized arguments of the method to create a
 * unique cache key for each method call.
 * @param [options] - The `options` parameter is an optional object that can contain the following
 * properties:
 * - `ttl` - The `ttl` property is a number that represents the time to live (in milliseconds) of
 * the cache entry. If the cache entry is older than the time to live, it is considered invalid and
 * will be evicted from the cache.
 * - `maxSize` - The `maxSize` property is a number that represents the maximum number of entries
 * that can be stored in the cache. If the cache size exceeds the maximum size, the least recently
 * accessed entry will be evicted from the cache.
 * - `handleError` - The `handleError` property is a boolean that indicates whether to handle errors
 * or not. If set to `true`, the decorator will catch errors and return an empty observable instead.
 * If set to `false`, the decorator will rethrow the error.
 * @returns The `Cacheable` function returns a decorator function.
 * @example
 * // The following code snippet shows how to use the `Cacheable` decorator.
 * import { Cacheable } from '@core/helpers';
 *
 * @Cacheable('getIcon', { maxSize: 150 })
 * get(name: string): Observable<string> {
 *  return this.http.get(<url>, { responseType: 'text' });
 * }
 */
export function Cacheable(cacheKey: string, options?: { ttl?: number; maxSize?: number; handleError?: boolean }) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!this._cacheService) {
        console.warn('CacheService is not available on the target class');
        return originalMethod.apply(this, args);
      }

      const cacheService: CacheService = this._cacheService;

      const normalizedArgs = JSON.stringify(args);
      const key = `${cacheKey}-${normalizedArgs}`;
      const now = Date.now();

      const cacheEntry = cacheService.get(key);
      if (cacheEntry && (!options?.ttl || now - cacheEntry.timestamp < options.ttl)) {
        cacheEntry.lastAccessed = now;
        cacheService.set(key, cacheEntry.data); // Update lastAccessed time
        return of(cacheEntry.data);
      }

      const inFlight = cacheService.getInFlightRequest(key);
      if (inFlight) {
        return inFlight;
      }

      const resultObservable: Observable<any> = originalMethod.apply(this, args).pipe(
        tap((result) => {
          cacheService.set(key, result);
          cacheService.deleteInFlightRequest(key);
          if (options?.maxSize && cacheService.getSize() >= options.maxSize) {
            cacheService.evictCache(Math.ceil(options.maxSize * 0.1));
          }
        }),
        catchError((err) => {
          cacheService.deleteInFlightRequest(key);
          return throwError(err);
        }),
        shareReplay(1),
      );

      cacheService.setInFlightRequest(key, resultObservable);

      return resultObservable;
    };

    return descriptor;
  };
}
