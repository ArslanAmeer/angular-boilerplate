import { ROLE } from '../../auth/enums/roles.enum';

// TODO: Implement the permissions as per your application requirements.
// Either fetch it from the server or define it in the client. if you have constant permissions, you can define it in below format and move this in core constants folder.
// If you have different structure, you have to modify the permissions setup as per your requirement in this file.

/**
 * The `appSetting` object contains the role-based permissions for the application.
 * The permission setup is based on the role-based access control (RBAC) model. In this model, permissions are assigned to roles, and roles are assigned to users.
 * For example, you can define the permissions in the following format:
 */
export const appSetting = {
  role: {
    [ROLE.ADMIN]: {
      create: {
        user: true,
        sale: true,
      },
      access: {
        user: true,
        sale: true,
      },
    },
    [ROLE.USER]: {
      create: {
        user: false,
        sale: false,
      },
      access: {
        user: false,
        sale: true,
      },
    },
    [ROLE.MEMBER]: {
      create: {
        user: false,
        sale: true,
      },
      access: {
        user: false,
        sale: true,
      },
    },
    [ROLE.GUEST]: {
      create: {
        user: false,
        sale: false,
      },
      access: {
        user: false,
        sale: false,
      },
    },
  },
};
