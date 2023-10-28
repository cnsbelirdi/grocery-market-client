import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotdealsComponent } from './hotdeals.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [HotdealsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HotdealsComponent }]),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
})
export class HotdealsModule {}
