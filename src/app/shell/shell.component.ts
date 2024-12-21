import { Component, OnInit } from '@angular/core';
import { ShellService } from '@app/shell/services/shell.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  standalone: false,
})
export class ShellComponent implements OnInit {
  isSidebarActive = false;

  constructor(
    private readonly _shellService: ShellService,
    private readonly _router: Router,
  ) {}

  ngOnInit() {
    // this._socketService.connect();
  }

  sidebarToggle(toggleState: boolean) {
    this.isSidebarActive = toggleState;
  }

  private _reloadCurrentRoute(path?: string) {
    const currentUrl = path || this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
