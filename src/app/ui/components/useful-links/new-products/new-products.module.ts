import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductsComponent } from './new-products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NewProductsComponent }]),
  ],
})
export class NewProductsModule {}
