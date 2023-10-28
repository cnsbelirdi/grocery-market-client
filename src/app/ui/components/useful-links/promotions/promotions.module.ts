import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PromotionsComponent }]),
    MatExpansionModule,
  ],
})
export class PromotionsModule {}
