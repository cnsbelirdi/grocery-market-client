import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NgIconsModule } from '@ng-icons/core';
import {
  matDocumentScannerOutline,
  matTableViewOutline,
  matStickyNote2Outline,
  matMoreVertOutline,
  matInfoOutline,
  matAccessTimeFilledOutline,
  matCheckOutline,
  matCloseOutline,
} from '@ng-icons/material-icons/outline';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent }]),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    DialogModule,
    MatInputModule,
    DeleteDirectiveModule,
    NgIconsModule.withIcons({
      matDocumentScannerOutline,
      matTableViewOutline,
      matStickyNote2Outline,
      matInfoOutline,
      matMoreVertOutline,
      matAccessTimeFilledOutline,
      matCheckOutline,
      matCloseOutline,
    }),
  ],
})
export class OrdersModule {}
