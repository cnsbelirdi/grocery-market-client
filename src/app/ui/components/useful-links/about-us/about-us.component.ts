import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ScrollBaseComponent } from 'src/app/base/scroll-base.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent
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
