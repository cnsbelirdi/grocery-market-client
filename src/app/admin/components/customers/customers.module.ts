import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NgIconsModule } from '@ng-icons/core';
import {
  matTableViewOutline,
  matPlusOutline,
} from '@ng-icons/material-icons/outline';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';

@NgModule({
  declarations: [CustomersComponent, CustomerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CustomersComponent }]),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    DialogModule,
    DeleteDirectiveModule,
    NgIconsModule.withIcons({
      matTableViewOutline,
      matPlusOutline,
    }),
  ],
})
export class CustomersModule {}
