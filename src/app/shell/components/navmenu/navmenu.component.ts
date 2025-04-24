import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { NavMode, ShellService } from '@app/shell/services/shell.service';
import { webNavMenuItems } from '@core/constants';
import { CredentialsService } from '@auth';
import { NavMenuItem } from '@core/interfaces';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
  standalone: false,
})
export class NavMenuComponent implements OnInit {
  version: string = environment.version;
  year: number = new Date().getFullYear();
  navMenuItems: NavMenuItem[] = [];
  navMenuExtendedItem = -1;
  //navExpanded = true;

  constructor(
    private readonly _router: Router,
    private readonly _credentialsService: CredentialsService,
    public shellService: ShellService,
  ) {
    this.navMenuItems = webNavMenuItems;
  }

  ngOnInit(): void {
    this.shellService.activeNavTab(this.navMenuItems, this.navMenuExtendedItem);

    this._router.events
      .pipe(untilDestroyed(this))
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.shellService.activeNavTab(this.navMenuItems, this.navMenuExtendedItem);
      });

    this.shellService.navMode$.pipe(untilDestroyed(this)).subscribe((mode) => {
      /**
       * Change the second condition to mode === NavMode.Locked to make navbar by default collapsed
       */
      //this.navExpanded = mode === NavMode.Free;
    });
  }

  /*
  toggleNavMenu(isEnterEvent: boolean): void {
    this.shellService.navMode$.pipe(untilDestroyed(this)).subscribe((mode) => {
      if (isEnterEvent) {
        this.navExpanded = true;
      } else if (!isEnterEvent && mode === NavMode.Free) {
        this.navExpanded = false;
      }
    });
  }
  */

  activateNavMenuItem(index: number): void {
    const item = this.navMenuItems[index];
    if (item.disabled) return;

    if (index !== this.navMenuExtendedItem) {
      this.navMenuExtendedItem = index;
    } else {
      this.navMenuExtendedItem = -1; // Toggle the same item
    }

    this.shellService.activateNavItem(index, this.navMenuItems);
  }

  activateNavMenuSubItem(index: number, subItem: NavMenuItem): void {
    this.shellService.activateNavSubItem(index, subItem, this.navMenuItems);
  }
}
