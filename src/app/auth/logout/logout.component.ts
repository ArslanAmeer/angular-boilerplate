import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService } from '@auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: false,
})
export class LogoutComponent implements OnInit {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _credentialsService: CredentialsService,
  ) {}

  ngOnInit() {
    if (!this._credentialsService.isAuthenticated()) {
      this._credentialsService.setCredentials();
      this._router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    } else {
      this._authService.logout().subscribe({
        next: () => {
          this._credentialsService.setCredentials();
          this._router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        },
        error: () => {
          console.error('Error logging out');
        },
      });
    }
  }
}
