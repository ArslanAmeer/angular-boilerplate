import { Route, Router, Routes } from '@angular/router';

import { AuthenticationGuard, PERMISSIONS, PermissionService } from '@app/auth';
import { ShellComponent } from '@app/shell/shell.component';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavMenuItem } from '@core/interfaces';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],

      data: { reuse: true },
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class ShellService {
  navicon = new BehaviorSubject<NavMode>(NavMode.Free);
  navModeSubject = new BehaviorSubject<NavMode>(NavMode.Free);
  navMode$ = this.navModeSubject.asObservable();
  navicon$ = this.navModeSubject.asObservable();

  constructor(
    private readonly _router: Router,
    public readonly _permissionService: PermissionService,
  ) {}

  allowedAccess(item: NavMenuItem): boolean {
    if (item.roles && item.roles.length) {
      return item.roles.includes(this._permissionService.userRole);
    }

    if (item.permissions && item.permissions.length) {
      return item.permissions.some((permission: PERMISSIONS) => this._permissionService.hasPermission(permission));
    }

    return true;
  }

  toggleNavMode(): void {
    const mode = this.navModeSubject.getValue();
    this.navModeSubject.next(mode === NavMode.Free ? NavMode.Locked : NavMode.Free);
    this.navicon.next(mode === NavMode.Free ? NavMode.Locked : NavMode.Free);
  }

  activeNavTab(items: NavMenuItem[], extendedItem: number): void {
    items.forEach((item, index) => {
      if (item.href) {
        const urlSegments = this._router.url.split('/').filter((segment) => segment.length > 0);
        const hrefSegments = item.href.split('/').filter((segment) => segment.length > 0);
        const isActive = hrefSegments.every((segment, i) => segment === urlSegments[i]);

        item.active = isActive;

        if (isActive && extendedItem) {
          extendedItem = index;
        }

        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (subItem.href) {
              const subItemHrefSegments = subItem.href.split('/').filter((segment) => segment.length > 0);
              subItem.active = subItemHrefSegments.every((segment, i) => segment === urlSegments[i]);
            }
          });
        }
      } else {
        item.active = false;
      }
    });
  }

  activateNavItem(index: number, navItems: NavMenuItem[]): void {
    const item = navItems[index];
    if (item.disabled) return;

    setTimeout(() => {
      const element = document.getElementById(`menu-item-${index}`);
      const navElement = document.querySelector('nav');

      if (element && navElement) {
        const elementRect = element.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();

        const relativeTop = elementRect.top - navRect.top;
        const desiredScrollPosition = navElement.scrollTop + relativeTop - navRect.height / 2;

        navElement.scrollTo({ top: desiredScrollPosition, behavior: 'smooth' });
      }
    }, 0);

    if (item && (!item.subItems || !item.subItems.length)) {
      this._router.navigate([item.href]);
    } else {
      // set false to all subitems of all items
      navItems.forEach((item) => {
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            subItem.active = false;
          });
        }
      });
    }
  }

  activateNavSubItem(i: number, subItem: NavMenuItem, sidebarItems: NavMenuItem[]) {
    if (subItem.disabled) return;
    subItem.active = true;
    sidebarItems[i].active = true;
    // disable all other subitems
    sidebarItems[i].subItems.forEach((item) => {
      if (item !== subItem) {
        item.active = false;
      }
    });
    if (subItem.href) {
      this._router.navigate([subItem.href]);
    }

    if (subItem.url) {
      window.open(subItem.url, '_blank');
    }
  }

  getCurrentActiveRoute(lastSegmentOnly = true): string {
    const url = this._router.url;
    const urlSegments = url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegmentOnly ? lastSegment : url;
  }
}

export enum NavMode {
  Locked,
  Free,
}
