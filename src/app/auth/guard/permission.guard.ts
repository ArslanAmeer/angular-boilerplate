import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PERMISSIONS, PermissionService, ROLE } from '@auth';

export const PermissionGuard: CanActivateFn & CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if roles are specified in the route and validate them
  const requiredRoles = route.data['roles'] as ROLE[] | undefined;
  if (requiredRoles?.length && !permissionService.hasRole(requiredRoles)) {
    return handleUnauthorized(router);
  }

  // Check permissions
  const requiredPermissions = route.data['permissions'] as PERMISSIONS[] | undefined;
  if (requiredPermissions?.length) {
    if (!checkPermissions(requiredPermissions, permissionService)) {
      return handleUnauthorized(router);
    }
  }

  return true;
};

// Utility function to handle unauthorized access
function handleUnauthorized(router: Router): boolean {
  router.navigate(['/unauthorized']);
  return false;
}

// Utility function to check permissions
function checkPermissions(permissions: PERMISSIONS[], permissionService: PermissionService): boolean {
  // Just an additional layer to check for special permissions, if you dont have any ignore it
  const specialPermissionHandlers = {};

  for (const permission of permissions) {
    const specialPermissionCheck = specialPermissionHandlers[permission];
    if (specialPermissionCheck) {
      if (specialPermissionCheck()) return true;
    } else if (permissionService.hasPermission(permission)) {
      return true;
    }
  }

  return false;
}
