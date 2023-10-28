import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NgIconsModule } from '@ng-icons/core';
import {
  matBarcodeOutline,
  matTableViewOutline,
  matPlusOutline,
  matInsertPhotoOutline,
  matEditOutline,
  matDeleteOutline,
  matShoppingBagOutline,
  matNumbersOutline,
} from '@ng-icons/material-icons/outline';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MarketplaceComponent, ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MarketplaceComponent }]),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    DialogModule,
    MatMenuModule,
    FileUploadModule,
    DeleteDirectiveModule,
    MatInputModule,
    MatIconModule,
    NgIconsModule.withIcons({
      matBarcodeOutline,
      matTableViewOutline,
      matPlusOutline,
      matInsertPhotoOutline,
      matEditOutline,
      matDeleteOutline,
      matShoppingBagOutline,
      matNumbersOutline,
    }),
  ],
})
export class MarketplaceModule {}
