import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundComponent } from './refund.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RefundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RefundComponent }]),
  ],
})
export class RefundModule {}
