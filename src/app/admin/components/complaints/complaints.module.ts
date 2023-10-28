import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsComponent } from './complaints.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComplaintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ComplaintsComponent }]),
  ],
})
export class ComplaintsModule {}
