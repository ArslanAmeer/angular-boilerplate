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

const prefix = '@WebApp:';
const prodEnv = environment.production;
const secretKey = 'a-quick-brown-fox-jumps-over-the-lazy-dog';

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

const xorWithSecretKey = (text: string, secret: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
  }
  return result;
};

const saveDataToLocalStorage = (key: any, value: any) => {
  if (prodEnv) {
    key = btoa(prefix + key.toString()); // Encode key as base64
    key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
    value = btoa(JSON.stringify(value)); // Encode value as base64
    value = xorWithSecretKey(value, secretKey); // XOR the value with the secret key
  }
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLocalStorage = (key: any) => {
  if (prodEnv) {
    key = btoa(prefix + key.toString()); // Encode key as base64
    key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
    const data = localStorage.getItem(key);
    const decodedValue = xorWithSecretKey(data!, secretKey); // XOR the value with the secret key
    return JSON.parse(atob(decodedValue)); // Decode base64 value
  }
  const data = localStorage.getItem(key);
  return JSON.parse(data!);
};

const removeDataFromLocalStorage = (key: any) => {
  if (prodEnv) {
    key = btoa(prefix + key.toString()); // Encode key as base64
    key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
  }
  localStorage.removeItem(key);
};

const clearStorage = () => localStorage.clear();
