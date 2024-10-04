import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    const isArray = Array.isArray(control.value);
    const isEmpty = isArray && control.value.length === 0;
    return isEmpty ? { arrayNotEmpty: { value: control.value } } : null;
  };
}

export function isValidDate(dateString: string): boolean {
  return /^\d{4}[-/]\d{2}[-/]\d{2}$/.test(dateString);
}

export function validateCustomDate(control: FormControl): ValidationErrors | null {
  if (!/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(control.value)) {
    return { invalidDateFormat: true };
  }
  return null;
}

// mustMatch validator function
export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

/**
 * Creates a validator function to validate that one time is in the future relative to another.
 * @param startControlName The form control name for the start time.
 * @param endControlName The form control name for the end time.
 * @returns A validator function.
 */
export function timeRangeValidator(startControlName: string, endControlName: string) {
  return (group: FormGroup): ValidationErrors | null => {
    const startTime = group.get(startControlName)?.value;
    const endTime = group.get(endControlName)?.value;

    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const startDate = new Date(1970, 0, 1, startHour, startMinute);
      const endDate = new Date(1970, 0, 1, endHour, endMinute);

      if (endDate <= startDate) {
        // If the end time is not after the start time, return an error object.
        const error = { timeRangeInvalid: true };
        group.get(endControlName)?.setErrors(error);
        return error;
      }
    }

    // If no errors, clear existing errors related to time range validation.
    group.get(endControlName)?.setErrors(null);
    return null; // Return null if no validation errors
  };
}

/**
 * Creates a generic validator function to check if one date is after another within the same FormGroup.
 * @param startControlName The form control name for the start date.
 * @param endControlName The form control name for the end date.
 * @returns A validator function that adds an error if the end date is not after the start date.
 */
export function dateRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group instanceof FormGroup)) return null;

    const startDate = group.get(startControlName)?.value;
    const endDate = group.get(endControlName)?.value;

    // Check if both dates are present before comparing
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if the end date is after the start date
      if (end <= start) {
        // If not, return an error object on the form group
        const errorObject = { dateRangeInvalid: true };
        // Optionally, set errors directly on the end date control to make handling specific error messages easier
        group.get(endControlName)?.setErrors(errorObject);
        return errorObject;
      }
    }

    // If everything is fine, clear errors related to the date range from the end date control
    const endControlErrors = group.get(endControlName)?.errors;
    if (endControlErrors?.['dateRangeInvalid']) {
      delete endControlErrors['dateRangeInvalid'];
      group.get(endControlName)?.setErrors(Object.keys(endControlErrors).length ? endControlErrors : null);
    }

    // Return null if no validation errors
    return null;
  };
}

/**
 * Validates that one date control's value is less than another, where one control is within a FormArray.
 * @param form The FormGroup containing both the FormArray and the control to compare.
 * @param arrayPath The path to the FormArray in the FormGroup.
 * @param arrayDateControlName The name of the control within the FormArray groups to compare.
 * @param controlName The name of the control outside the FormArray to compare against the array's date control.
 * @returns A validator function that applies the specified validation.
 */
export function dateRangeArrayAndControlValidator(form: FormGroup, arrayPath: string, arrayDateControlName: string, controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const dateArray = form?.get(arrayPath) as FormArray;
    const endDateControl = control.get(controlName);
    const endDate = endDateControl?.value;

    if (dateArray && dateArray.length > 0 && endDate) {
      const firstEventGroup = dateArray.at(0) as FormGroup;
      const startDate = firstEventGroup.get(arrayDateControlName)?.value;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Set true if invalid, false otherwise
        const isInvalid = end <= start;
        endDateControl?.setErrors(isInvalid ? { dateRangeInvalid: true } : null);
        return isInvalid ? { dateRangeInvalid: true } : null;
      }
    }

    // If the conditions don't hold or are valid, clear any errors related to date range
    endDateControl?.setErrors(null);
    return null; // If all checks pass, return null
  };
}

/**
 * Creates a validator function to ensure the uniqueness of a field within a FormArray or FormGroup.
 * @param parentControl A reference to the parent FormArray or FormGroup.
 * @param fieldName The name of the field within the form groups to check for uniqueness.
 * @returns A validator function.
 */
export function uniqueFieldValidator(parentControl: AbstractControl, fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentValue = control.value;
    let occurrences = 0;

    // Handling for FormArray
    if (parentControl instanceof FormArray) {
      occurrences = parentControl.controls.filter((ctrl) => ctrl.get(fieldName)?.value === currentValue).length;
    }
    // Handling for FormGroup
    else if (parentControl instanceof FormGroup) {
      const controls = Object.values(parentControl.controls);
      occurrences = controls.filter((ctrl) => {
        // Assuming each control is a FormGroup that might contain the fieldName
        if (ctrl instanceof FormGroup) {
          return ctrl.get(fieldName)?.value === currentValue;
        }
        return false;
      }).length;
    }

    return occurrences > 1 ? { uniqueField: true } : null;
  };
}
