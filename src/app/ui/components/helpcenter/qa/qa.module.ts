import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaComponent } from './qa.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: QaComponent }]),
  ],
})
export class QaModule {}
