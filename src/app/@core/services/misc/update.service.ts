import { ApplicationRef, Component, Inject, Injectable, Optional } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, interval } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { HotToastRef, HotToastService } from '@ngxpert/hot-toast';

/* The `AppUpdateService` is responsible for checking for app updates using a
service worker and displaying update alerts to the user. */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  private _isUpdateToastShown = false;

  constructor(
    private readonly _swUpdate: SwUpdate,
    private readonly _toastService: HotToastService,
    appRef: ApplicationRef,
  ) {
    console.log('%c Update service is running...', 'color: green; font-weight: bold;');

    if (this._swUpdate?.isEnabled) {
      console.log('%c Service worker enabled', 'color: orange; font-weight: bold;');

      // Allow the app to stabilize first, before starting polling for updates.
      const appIsStable$ = appRef?.isStable?.pipe(first((isStable) => isStable === true));
      const everySixHours$ = interval(1000 * 60 * 60 * 6).pipe(startWith(0));
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.pipe(untilDestroyed(this)).subscribe(async () => {
        try {
          console.log('%c Checking for app updates...', 'color: yellow; font-weight: bold;');
          this._isUpdateToastShown = false;
          const updateFound = await this._swUpdate.checkForUpdate();
          console.log('%c Finish checking for updates...', 'color: yellow; font-weight: bold;');
          console.log(updateFound ? '%c A new version is available.' : '%c Already on the latest version.', 'color: white; font-weight: bold;');
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    } else console.log('%c No service worker allow', 'color: red; font-weight: bold;');
  }

  subscribeForUpdates(): void {
    this._swUpdate?.versionUpdates?.pipe(untilDestroyed(this)).subscribe((evt) => {
      // console.log('%c New version available', 'color: green; font-weight: bold;');
      // event.type === 'VERSION_READY' && this.showAppUpdateAlert();
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`%c Downloading new app version: ${evt.version.hash}`, 'color: green;');
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`%c New app version ready for use: ${evt.latestVersion.hash}`, 'color: cyan; font-weight: bold;');
          this._showAppUpdateAlert();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`%c Failed to install app version '${evt.version.hash}': ${evt.error}`, 'color: red; font-weight: bold;');
          break;
      }
      // this.showAppUpdateAlert();
    });
  }

  private _showAppUpdateAlert() {
    if (this._isUpdateToastShown) {
      return;
    }
    this._isUpdateToastShown = true;
    const toastRef = this._toastService.show(UpdateComponent, {
      autoClose: false,
      dismissible: false,
    });
    toastRef.afterClosed.subscribe(() => {
      this._swUpdate.activateUpdate().then(() => document.location.reload());
      this._isUpdateToastShown = false;
    });
  }
}

// App Update Notification Component
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-update-component',
  template: `
    New Version is Available.
    <a style="color: #E9380BFF" (click)="toastRef.close({ dismissedByAction: true })">Please Click to Update</a>
    or <a style="color: #E9380BFF" (click)="toastRef.close({ dismissedByAction: false })">Close</a>
  `,
  standalone: true,
})
export class UpdateComponent {
  constructor(@Optional() @Inject(HotToastRef) public toastRef: HotToastRef<string>) {}
}
