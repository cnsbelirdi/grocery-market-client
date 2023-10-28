import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoadComponentService {
  constructor() {}

  async loadComponent(
    component: DynamicComponent,
    viewContainerRef: ViewContainerRef
  ) {
    let _component: any = null;
    debugger;
    switch (component) {
      case DynamicComponent.BasketsComponent:
        _component = (
          await import(
            '../../ui/layout/components/header/basket/basket.component'
          )
        ).BasketComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
}

export enum DynamicComponent {
  BasketsComponent,
}
