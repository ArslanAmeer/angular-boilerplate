import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { ShellService } from '@app/shell/services/shell.service';
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

  constructor(
    private readonly _router: Router,
    public readonly credentialsService: CredentialsService,
    public shellService: ShellService,
  ) {}

  ngOnInit(): void {
    this.navMenuItems = webNavMenuItems;
    this.shellService.activeNavTab(this.navMenuItems, this.navMenuExtendedItem);

    this._router.events
      .pipe(untilDestroyed(this))
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.shellService.activeNavTab(this.navMenuItems, this.navMenuExtendedItem);
      });
  }

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
