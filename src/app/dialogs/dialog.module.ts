import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { CreateCategoryDialogComponent } from './create-category-dialog/create-category-dialog.component';
import { CreateRoleDialogComponent } from './create-role-dialog/create-role-dialog.component';
import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { NgIconsModule } from '@ng-icons/core';
import { matBarcodeOutline } from '@ng-icons/material-icons/outline';
import { heroPrinter } from '@ng-icons/heroicons/outline';
import { BarcodeDialogComponent } from './barcode-dialog/barcode-dialog.component';
import { NgxBarcodeScannerModule } from '@eisberg-labs/ngx-barcode-scanner';
import { OrderCompleteDialogComponent } from './order-complete-dialog/order-complete-dialog.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { UserOrderDetailDialogComponent } from './user-order-detail-dialog/user-order-detail-dialog.component';
import { DeleteDirectiveModule } from '../directives/admin/delete.directive.module';
import { OrderBillDialogComponent } from './order-bill-dialog/order-bill-dialog.component';
import { CreatePaymentDialogComponent } from './create-payment-dialog/create-payment-dialog.component';
import { UpdatePaymentDialogComponent } from './update-payment-dialog/update-payment-dialog.component';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    OrderCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    CreateProductDialogComponent,
    CreateUserDialogComponent,
    CreateCategoryDialogComponent,
    CreateRoleDialogComponent,
    ProductDetailDialogComponent,
    BarcodeDialogComponent,
    UpdateUserDialogComponent,
    UserOrderDetailDialogComponent,
    OrderBillDialogComponent,
    CreatePaymentDialogComponent,
    UpdatePaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    DeleteDirectiveModule,
    FileUploadModule,
    FormsModule,
    MatTableModule,
    MatListModule,
    NgxBarcodeScannerModule,
    NgIconsModule.withIcons({
      matBarcodeOutline,
      heroPrinter,
    }),
  ],
})
export class DialogModule {}
