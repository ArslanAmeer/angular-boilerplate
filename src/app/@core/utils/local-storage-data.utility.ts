import { Credentials } from '@core/entities';

/**
 * List of local storage keys
 */
export enum LocalStorageKeys {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
  USER_ID = 'id',
  CREDENTIALS = 'credentials',
}

// const prefix = '@app:';
// const prodEnv = environment.production;
// const secretKey = 'a-quick-brown-fox-jumps-over-the-lazy-dog';
// const secretKeyName = '@entry';
// const secretKeyValue = 'xx1029384756';

export const GetCredentials = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS) as Credentials;

export const SetCredentials = (credentials: Credentials) => saveDataToLocalStorage(LocalStorageKeys.CREDENTIALS, credentials);

export const GetToken = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.TOKEN];

export const GetRefreshToken = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.REFRESH_TOKEN];

export const GetUserId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.USER_ID];

export const ClearStorage = () => clearStorage();

export const RemoveAuthData = () => {
  for (const key in LocalStorageKeys) {
    removeDataFromLocalStorage(key);
  }
};

// const xorWithSecretKey = (text: string, secret: string): string => {
//   let result = '';
//   for (let i = 0; i < text.length; i++) {
//     result += String.fromCharCode(text.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
//   }
//   return result;
// };

const saveDataToLocalStorage = (key: any, value: any) => {
  // if (prodEnv) {
  //   key = btoa(prefix + key.toString()); // Encode key as base64
  //   key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
  //   value = btoa(JSON.stringify(value)); // Encode value as base64
  //   value = xorWithSecretKey(value, secretKey); // XOR the value with the secret key
  //   localStorage.setItem(secretKeyName, secretKeyValue);
  // }
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLocalStorage = (key: any) => {
  // const isSecretKey = localStorage.getItem(secretKeyName) === secretKeyValue;
  // if (prodEnv && isSecretKey) {
  //   key = btoa(prefix + key.toString()); // Encode key as base64
  //   key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
  //   const data = localStorage.getItem(key);
  //   if (!data) window.location.href = '/logout';
  //   const decodedValue = xorWithSecretKey(data, secretKey); // XOR the value with the secret key
  //   return JSON.parse(atob(decodedValue)); // Decode base64 value
  // }
  const data = localStorage.getItem(key);
  if (!data) window.location.href = '/logout';
  return JSON.parse(data);
};

const removeDataFromLocalStorage = (key: any) => {
  // if (prodEnv) {
  //   key = btoa(prefix + key.toString()); // Encode key as base64
  //   key = xorWithSecretKey(key, secretKey); // XOR the key with the secret key
  // }
  localStorage.removeItem(key);
};

const clearStorage = () => localStorage.clear();
