import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotdealsComponent } from './hotdeals.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HotdealsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HotdealsComponent }]),
  ],
})
export class HotdealsModule {}
