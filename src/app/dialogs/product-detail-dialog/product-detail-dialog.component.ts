import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { List_Category } from 'src/app/contracts/category/list_category';
import { MatSelect } from '@angular/material/select';
import { SpinnerType } from 'src/app/base/base.component';
import { Update_Product } from 'src/app/contracts/update_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseUrl } from 'src/app/contracts/base_url';
import { BarcodeDialogComponent } from '../barcode-dialog/barcode-dialog.component';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss'],
})
export class ProductDetailDialogComponent
  extends BaseDialog<ProductDetailDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: List_Product,
    private productService: ProductService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private fileService: FileService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }
  categories: List_Category[] = [];
  product: List_Product;
  baseUrl: BaseUrl;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.categories = await (
      await this.categoryService.getAllCategories(-1, -1)
    ).categories;
    this.product = this.data;
  }

  editProduct(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement,
    barcode: HTMLInputElement,
    description: HTMLTextAreaElement,
    category: MatSelect
  ) {
    this.spinner.show(SpinnerType.BallAtom);
    if (!name.value || !stock.value || !price.value || !category.value) {
      this.toastrService.message(
        'Please do not leave name, stock, price or category field empty!',
        'Warning',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      this.spinner.hide(SpinnerType.BallAtom);
      return;
    }

    if (parseInt(stock.value) < 0 || parseInt(price.value) < 0) {
      this.toastrService.message(
        'The stock or price can not be negative!',
        'Warning',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      this.spinner.hide(SpinnerType.BallAtom);
      return;
    }

    const edit_product: Update_Product = new Update_Product();
    edit_product.id = this.product.id;
    edit_product.name = name.value;
    edit_product.stock = parseInt(stock.value);
    edit_product.price = parseFloat(price.value);
    edit_product.barcode = barcode.value;
    edit_product.description = description.value;
    edit_product.categoryId = category.value;

    this.productService.update(
      edit_product,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message('The changes have been saved!', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      },
      (errorMessage) => {
        this.toastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );
  }

  changeBarcodeValue(barcode: string) {
    this.product.barcode = barcode;
  }

  scanBarcode() {
    this.dialogService.openDialog({
      componentType: BarcodeDialogComponent,
      data: this.changeBarcodeValue,
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }
}
