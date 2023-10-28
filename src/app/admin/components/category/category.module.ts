import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
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
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CategoryComponent }]),
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
export class CategoryModule {}
