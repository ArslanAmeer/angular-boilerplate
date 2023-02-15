import {UserType} from "@core/constants/users.constant";

/**
 *  This function returns the route of current user
 * @param userType
 * @private
 */
export function GetUserTypeRoute(userType: string): string {
  if (!userType) return '';

  const routes = [
    {name: UserType.SUPER_ADMIN, route: '/home'},
    {name: UserType.GLOBAL_USER, route: '/home'},
    {name: UserType.ADMIN, route: '/home'},
    {name: UserType.USER, route: '/home'},
  ];

  const result = routes.find(element => element.name === userType);

  // @ts-ignore
  return result.route ?? '/home';
}
