import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PromotionsComponent }]),
  ],
})
export class PromotionsModule {}
