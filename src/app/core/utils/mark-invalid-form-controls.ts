/**
 * This function marks a form as dirty and scroll to the first invalid control.
 * @param formGroup The form group to mark as dirty. Required Parameter.
 * @param refElement The reference element to scroll to.
 * refElement is required to scroll to the first invalid control. You can pass the ref element by invoking `private el: ElementRef` in
 * the constructor of the component and then pass `this.el` to function as a second parameter.
 */

import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {ElementRef} from '@angular/core';

export function markInvalidFormControls<T extends AbstractControl>(control: T, elRef: ElementRef): void {

  if (control instanceof FormGroup) {
    const controls = control.controls;
    control.markAllAsTouched();
    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty();
      markInvalidFormControls(controls[key], elRef);
    });
    scrollToFirstInvalidControl(elRef);
  } else if (control instanceof FormArray) {
    control.controls.forEach((formControl) => {
      formControl.markAsDirty();
      formControl.markAsTouched();
    });
    scrollToFirstInvalidControl(elRef);
  } else if (control instanceof FormControl) {
    control.markAsDirty();
    control.markAsTouched();
    scrollToFirstInvalidControl(elRef);
  } else {
    throw new Error('Error: unexpected control value');
  }
}

function scrollToFirstInvalidControl(refElement: ElementRef) {
  const firstInvalidControl: HTMLElement = refElement.nativeElement.querySelector('form .ng-invalid');
  if (firstInvalidControl) {
    firstInvalidControl.scrollIntoView({block: 'start', behavior: 'smooth'});
    (firstInvalidControl as HTMLElement).focus();
  }
}
