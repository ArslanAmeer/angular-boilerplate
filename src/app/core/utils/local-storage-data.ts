import {environment} from '@env/environment';

/**
 * List of local storage keys
 */

export enum LocalStorageKeys {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  USER_TYPE = 'user_type',
  USER_DETAILS = 'user_detail',
  USER_ID = 'user_id'
}

const prodEnv = environment.production;

export const GetToken = () => getDataFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
export const SetToken = (token: string) => saveDataToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, token);

export const GetRefreshToken = () => getDataFromLocalStorage(LocalStorageKeys.REFRESH_TOKEN);
export const SetRefreshToken = (token: string) => saveDataToLocalStorage(LocalStorageKeys.REFRESH_TOKEN, token);

export const GetUserType = () => getDataFromLocalStorage(LocalStorageKeys.USER_TYPE);
export const SetUserType = (user_type: string) => saveDataToLocalStorage(LocalStorageKeys.USER_TYPE, user_type);

export const GetUserId = () => getDataFromLocalStorage(LocalStorageKeys.USER_ID);
export const SetUserId = (user_id: number) => saveDataToLocalStorage(LocalStorageKeys.USER_ID, user_id);

export const GetUserDetail = () => getDataFromLocalStorage(LocalStorageKeys.USER_DETAILS);
export const SetUserDetail = (userDetail: any) => saveDataToLocalStorage(LocalStorageKeys.USER_DETAILS, userDetail);
export const ClearStorage = () => clearStorage();

export const RemoveAuthData = () => {
  for (const key in LocalStorageKeys) {
    removeDataFromLocalStorage(key);
  }
};

// const encryptStorage = new EncryptStorage('this-will-be-our-web-secret', {
//   prefix: '@web',
//   storageType: 'localStorage',
//   encAlgorithm: 'AES',
// });

const saveDataToLocalStorage = (key: any, value: any) => {
  // if (prodEnv) {
  //   encryptStorage.setItem(key, value);
  //   return;
  // }
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLocalStorage = (key: any) => {
  // if (prodEnv) {
  //   return encryptStorage.getItem(key);
  // }
  const data = localStorage.getItem(key);
  return JSON.parse(data!);
};

const removeDataFromLocalStorage = (key: any) => {
  // if (prodEnv) {
  //   encryptStorage.removeItem(key);
  //   return;
  // }
  localStorage.removeItem(key);
};

const clearStorage = () => localStorage.clear();
