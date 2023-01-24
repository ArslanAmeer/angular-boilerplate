import {AbstractControl, ValidatorFn} from '@angular/forms';

export default class MatchValidator {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['doNotMatch']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({doNotMatch: true});
        return {doNotMatch: true};
      } else {
        return null;
      }
    };
  }
}
