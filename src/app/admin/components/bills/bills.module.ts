import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BillsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BillsComponent }]),
  ],
})
export class BillsModule {}
