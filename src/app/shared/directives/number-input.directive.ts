import { Directive, ElementRef, HostListener, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberInput]',
  standalone: true,
})
export class NumberInputDirective implements OnInit {
  @Input() type: 'number' | 'phone' | 'zipcode' = 'number';
  @Input() customRegex?: string;
  @Input() maxLength = 14;
  private _regex = new RegExp(/^\d+$/);

  constructor(
    private readonly _el: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
  ) {}

  ngOnInit() {
    switch (this.type) {
      case 'number':
        this._regex = new RegExp(/^\d+$/);
        break;
      case 'phone':
        this._regex = new RegExp(this.customRegex || /^(\+49)?[ ]?(\([0-9]{3}\)[ ]?)?[0-9]{3,14}$/);
        this.maxLength = 16; // +49 (123) 4567890
        break;
      case 'zipcode':
        this._regex = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
        this.maxLength = 5;
        break;
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9 +()]/g, '').slice(0, this.maxLength);

    if (this.ngControl && this.ngControl.control) {
      if (!this._regex.test(this._el.nativeElement.value)) {
        this.ngControl.control.setErrors({ invalid: true });
      } else {
        this.ngControl.control.setErrors(null);
      }
    }
  }
}
