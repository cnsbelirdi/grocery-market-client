import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ScrollBaseComponent } from 'src/app/base/scroll-base.component';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss'],
})
export class NewProductsComponent
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
