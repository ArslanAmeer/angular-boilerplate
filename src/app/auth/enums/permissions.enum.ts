/**
 * Enum for permissions
 * @readonly
 * @enum {string}
 *
 * @description The permissions enum is used to define the permissions in the application. it is derived from the role-based access control (RBAC) model and the
 * predefined role based permissions, which are defined in the `appSetting` object in the `@core/constants/app-settings` file.
 *
 * This permission enum can be used in routes, components, services, and directives to check if the user has the required permission to access the resource.
 *
 * The permission in this enum is derived as a combination of the action and the resource. For example, `CREATE_USER` means the user has permission to create a user.
 * which in `appSettings` is defined as `role: { [ROLE.ADMIN]: { create: { user: true } } }`.
 *
 * @example
 * ```typescript
 * import { PERMISSIONS } from '@app/auth/enums/permissions.enum';
 *
 * if (this._permissionService.hasPermission(PERMISSIONS.CREATE_USER)) {
 *  // do something
 *  }
 */

export enum PERMISSIONS {
  CREATE_USER = 'create.user',
  CREATE_SALE = 'create.sale',
  ACCESS_USER = 'access.user',
  ACCESS_SALE = 'access.sale',
}
