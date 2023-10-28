import { NgModule } from '@angular/core';
import { CategoryDirective } from './category.directive';

@NgModule({
  declarations: [CategoryDirective],
  exports: [CategoryDirective],
})
export class CategoryDirectiveModule {}
