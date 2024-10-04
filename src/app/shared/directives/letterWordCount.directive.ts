import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLetterWordCount]',
  standalone: true,
})
/**
 * `LetterWordCountDirective` is a directive that counts the number of letters or words in a given HTML element.
 * It can also limit the maximum number of characters or words allowed in the element.
 * It can also reverse the count to show the remaining number of characters or words.
 * It can be used only with a textarea or input element.
 *
 * @directive
 * @selector appLetterWordCount
 * @standalone true
 *
 * @example
 * <span [targetElement]="textAreaInput" appLetterWordCount reverse="true"></span>
 *   <textarea
 *     #textAreaInput
 *     id="description"
 *     name="description"
 *     rows="6"
 *   ></textarea>
 */
export class LetterWordCountDirective implements OnInit {
  /**
   * Determines whether to count words or characters. If true, it counts words, otherwise it counts characters.
   * @default false
   */
  @Input() countWords = false;

  /**
   * The target element to count the number of characters or words.
   * @type {HTMLElement}
   */
  @Input() targetElement: HTMLElement;

  /**
   * The maximum number of characters or words allowed in the target element.
   * @default 600
   */
  @Input() maxLimit = 600; // Default limit

  /**
   * Determines whether to reverse the count. If true, it counts the remaining number of characters or words.
   * @default false
   */
  @Input() reverse = false;

  /**
   * Determines whether to show the maximum limit of characters or words.
   */
  @Input() showMaxLimit = false;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (this.targetElement) {
      this._renderer.listen(this.targetElement, 'input', () => this._updateCount());
    }
    this._updateCount();
  }

  /**
   * Updates the count of characters or words in the target element.
   * @private
   */
  private _updateCount(): void {
    if (!this.targetElement) return;

    let text = '';
    if (this.targetElement instanceof HTMLInputElement || this.targetElement instanceof HTMLTextAreaElement) {
      text = this.targetElement.value;
    } else {
      text = this.targetElement.innerText;
    }

    let count = this.countWords ? text.split(/\s+/).filter((word) => word.length > 0).length : text.length;
    if (this.reverse) {
      count = this.maxLimit - count;
      if (count < 0) {
        count = 0;
        if (this.targetElement instanceof HTMLInputElement || this.targetElement instanceof HTMLTextAreaElement) {
          this.targetElement.value = text.substring(0, this.maxLimit); // Prevent further input
        }
      }
    } else if (count > this.maxLimit) {
      this._renderer.setStyle(this._el.nativeElement, 'color', 'var(--red)');
    } else {
      this._renderer.removeStyle(this._el.nativeElement, 'color');
    }

    this._el.nativeElement.innerText = `${count}`;
    if (this.showMaxLimit) {
      this._el.nativeElement.innerText += ` / ${this.maxLimit}`;
    }
  }
}
