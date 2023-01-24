/**
 * This function is used to get the advance url with the query params
 * @param url {string}
 * @param query {any}
 * @returns {string}
 */

// import {IQueryBuilder} from '@core/models/others/queryBuilder';

export const GetAdvanceUrl = (url: string, query: any) => {
  let queryString = '';
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryString += `${key}=${query[key]}&`;
    }
  }
  return `${url}?${queryString}`;

}
