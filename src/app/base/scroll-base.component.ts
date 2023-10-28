import { AfterViewInit, ElementRef } from '@angular/core';

export class ScrollBaseComponent {
  constructor(private elementRef: ElementRef) {}

  scrollToElement() {
    const element = this.elementRef.nativeElement;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
    window.scrollBy(0, -10);
  }
}
