import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ScrollBaseComponent } from 'src/app/base/scroll-base.component';

@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrls: ['./hotdeals.component.scss'],
})
export class HotdealsComponent
  extends ScrollBaseComponent
  implements AfterViewInit
{
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngAfterViewInit() {
    this.scrollToElement();
  }
}
