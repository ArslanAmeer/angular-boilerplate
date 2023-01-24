import {UserType} from "@core/constants/users";

/**
 *  This function returns the route of current user
 * @param userType
 * @private
 */
export function GetUserTypeRoute(userType: string): string {
  if (!userType) return '';

  const routes = [
    {name: UserType.GLOBAL_USER, route: 'home'},
  ];

  const result = routes.find(element => element.name === userType);

  // @ts-ignore
  return result.route ?? '';
}
