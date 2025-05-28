import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@app/auth';
import { matchValidator } from '@app/@core/helpers/validators';

@UntilDestroy()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchValidator('password', 'confirmPassword'),
      },
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, password } = this.signupForm.value;

    this.authService
      .signup({ username, email, password })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Registration failed';
        },
      });
  }
}
