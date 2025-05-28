import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  version: string | null = environment.version;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthenticationService,
  ) {}

  login() {
    // Here You can call the login method from the AuthenticationService directly and pass the required parameters.
    // setting credentials and other logic will be handled in the AuthenticationService.
    this._authService
      .login({
        username: 'johndoe',
        password: '123456',
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('Login successful');
            this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/discover'], { replaceUrl: true }).then(() => {
              console.log('Navigated to Discover');
            });
          }
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
  }
}
