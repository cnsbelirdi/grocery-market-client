import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { List_Category } from 'src/app/contracts/category/list_category';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BarcodeDialogComponent } from '../barcode-dialog/barcode-dialog.component';

declare var $: any;

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss'],
})
export class CreateProductDialogComponent
  extends BaseDialog<CreateProductDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<CreateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EventEmitter<Create_Product>,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private toastrService: ToastrNotifyService,
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }

  categories: List_Category[] = [];
  async ngOnInit() {
    this.categories = await (
      await this.categoryService.getAllCategories(-1, -1)
    ).categories;
  }

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement,
    barcode: HTMLInputElement,
    description: HTMLTextAreaElement,
    category: MatSelect
  ) {
    this.spinner.show(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    create_product.barcode = barcode.value;
    create_product.description = description.value;
    create_product.categoryId = category.value;

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

    this.productService.create(
      create_product,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message('Product created successfully!', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
        this.data.emit(create_product);
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
    $('#txtBarcode').val(barcode);
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
export enum CreateState {
  Close,
  Create,
}
