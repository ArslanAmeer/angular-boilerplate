import { Credentials } from '@core/entities';

/**
 * List of local storage keys
 */
export enum LocalStorageKeys {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
  USER_ID = 'userId',
  TEAM_ID = 'teamId',
  MEMBER_ID = 'memberId',
  DATABASE_ID = 'databaseId',
  CREDENTIALS = 'credentials',
  ALLOW_ADVERTISMENT = 'allowAdvertisement',
  KEYCLOAK_ID = 'id',
  PUSH_NOTIFICATION_SEEN = 'pushNotificationSeen',
  HEADLINE_OPTION = 'headlineOption',
}

// const prefix = '@tineon:';
// const prodEnv = environment.production;
// const secretKey = 'a-quick-brown-fox-jumps-over-the-lazy-dog';
// const secretKeyName = '@entry';
// const secretKeyValue = 'xx1029384756';

export const GetCredentials = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS) as Credentials;
export const SetCredentials = (credentials: Credentials) => saveDataToLocalStorage(LocalStorageKeys.CREDENTIALS, credentials);

export const GetToken = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.TOKEN];

export const GetRefreshToken = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.REFRESH_TOKEN];

export const GetUserId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.USER_ID];

export const GetKeycloakId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.KEYCLOAK_ID];

export const GetMemberId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.MEMBER_ID];

export const GetTeamId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.TEAM_ID];

export const GetDatabaseId = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.DATABASE_ID];

export const GetAllowAdvertisement = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.ALLOW_ADVERTISMENT];

export const SetPushNotificationSeen = () => localStorage.setItem(LocalStorageKeys.PUSH_NOTIFICATION_SEEN, 'true');

export const GetPushNotificationSeen = () => localStorage.getItem(LocalStorageKeys.PUSH_NOTIFICATION_SEEN) === 'true';

export const ClearPushNotificationSeen = () => localStorage.removeItem(LocalStorageKeys.PUSH_NOTIFICATION_SEEN);

export const GetHeadlineOption = () => getDataFromLocalStorage(LocalStorageKeys.CREDENTIALS)[LocalStorageKeys.HEADLINE_OPTION];

export const SetHeadlineOption = (headlineOption: 0 | 1) => {
  const credentials = GetCredentials();
  credentials[LocalStorageKeys.HEADLINE_OPTION] = headlineOption;
  SetCredentials(credentials);
};

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
