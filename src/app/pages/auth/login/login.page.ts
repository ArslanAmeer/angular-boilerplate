import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@core/services/auth/auth.service';
import {GetUserTypeRoute} from '@core/utils/custom-user-type-routes';
import {GetUserType} from '@core/utils/local-storage-data';
import {markInvalidFormControls} from "@core/utils";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

    $LoginForm!: UntypedFormGroup;
    isLoading = false;
    showSpinner = false;
    subscriptions: Subscription[] = [];

    constructor(private _router: ActivatedRoute, private _route: Router, private _authService: AuthService, private _activatedRoute: ActivatedRoute,
                private el: ElementRef) {
    }

    ngOnInit(): void {
        if (this._authService.authenticated) {
            this._route.navigate([GetUserTypeRoute(GetUserType())]).then();
        } else {
            this.initForm();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }


    initForm() {
        this.$LoginForm = new UntypedFormGroup({
            username: new UntypedFormControl('', [Validators.required]),
            password: new UntypedFormControl('', [Validators.required])
        }, {
            updateOn: 'submit'
        });
    }

    processLogin() {
        this.isLoading = true;
        if (this.$LoginForm?.valid) {
            this.$LoginForm.disable();

            this.subscriptions.push(this._authService.login(this.$LoginForm.value).subscribe({
                next: (data) => {
                    // Your additional code here
                    console.log('Login Success')

                    setTimeout(() => {
                        this.navigateUser(data.user_type);
                    }, 2000);
                }, error: () => {
                    // Your additional code here
                    console.log('Login Failed')
                    this.isLoading = false;
                    this.$LoginForm.enable();
                }
            }));
        } else {
            markInvalidFormControls(this.$LoginForm, this.el);
            // Your additional code here
            console.log('Login Failed, Please enter required fields')
            this.isLoading = false;
            this.$LoginForm.enable();
        }
    }


    // ---------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------- Private Functions -------------------------------------------------
    // ---------------------------------------------------------------------------------------------------------------------

    /**
     * This function navigates to the route of current user type
     * @param userType
     * @private
     */
    private navigateUser(userType: string): void {
        const userRoute = GetUserTypeRoute(userType);
        let redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || userRoute || '/';
        if (userRoute) {
            // window.location.href = redirectURL;
            this._route.navigate([redirectURL]).then();
        } else {
            // Your additional code here
            console.log('You are not authorized to access this page')
            this.isLoading = false;
            this.$LoginForm.enable();
        }
    }

}
