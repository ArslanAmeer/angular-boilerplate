/**
 * @description
 * This enum contains the possible statuses of the user's auth
 * @enum AuthStatuses
 * @readonly
 * @property {string} SUCCESSFUL_REGISTRATION - The user has successfully registered.
 * @property {string} PENDING_VERIFICATION - The user has successfully registered but has not verified their email.
 * @property {string} VERIFIED_ACCOUNT - The user has successfully registered and verified their email.
 */

export enum AuthStatuses {
  SUCCESSFUL_REGISTRATION = 'registration-successful',
  PENDING_VERIFICATION = 'pending-verification',
  SUCCESSFUL_REGISTRATION_PENDING_VERIFICATION = 'registration-successful-pending-verification',
  VERIFIED_ACCOUNT = 'account-verified',
  ALREADY_VERIFIED = 'already-verified'
}

/**
 * @description
 * This object contains the descriptions of the possible statuses of the user's auth
 * @enum AuthStatuses
 * @readonly
 */

export const AuthStatusDescriptions = {
  [AuthStatuses.SUCCESSFUL_REGISTRATION]: 'Your account is successfully registered. Please login to continue',
  [AuthStatuses.PENDING_VERIFICATION]: 'Your account is pending verification. Please check your email for verification link',
  [AuthStatuses.SUCCESSFUL_REGISTRATION_PENDING_VERIFICATION]: 'Your account is successfully registered. Please check your email for verification link',
  [AuthStatuses.VERIFIED_ACCOUNT]: 'Your account has been verified. Please login to continue',
  [AuthStatuses.ALREADY_VERIFIED]: 'Your account has already been verified. Please login to continue'
};

/**
 * @description
 * This function returns the status of the user's auth
 * @param value
 * @returns [AuthStatuses, string] | boolean | undefined
 * @example
 * const authStatus = GetAuthStatus('registration-successful');
 * console.log(authStatus);
 * // [AuthStatuses.SUCCESSFUL_REGISTRATION, 'Registration successful. Please login to continue']
 */
export function GetAuthStatus(value: string): [AuthStatuses, string] | boolean | undefined {
  if (Object.values(AuthStatuses).includes(value as AuthStatuses)) {
    return [value, AuthStatusDescriptions[value as AuthStatuses]] as [AuthStatuses, string];
  }
 return false;

}
