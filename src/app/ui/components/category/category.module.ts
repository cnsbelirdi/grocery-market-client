import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { matAddShoppingCartOutline } from '@ng-icons/material-icons/outline';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CategoryComponent }]),
    NgIconsModule.withIcons({
      matAddShoppingCartOutline,
    }),
    MatPaginatorModule,
  ],
})
export class CategoryModule {}
