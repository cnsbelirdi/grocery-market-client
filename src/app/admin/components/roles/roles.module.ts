import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { NgIconsModule } from '@ng-icons/core';
import {
  matTableViewOutline,
  matPlusOutline,
} from '@ng-icons/material-icons/outline';

@NgModule({
  declarations: [RolesComponent, RoleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RolesComponent }]),
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
export class RolesModule {}
