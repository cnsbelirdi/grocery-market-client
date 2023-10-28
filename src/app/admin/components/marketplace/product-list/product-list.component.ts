import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { BarcodeDialogComponent } from 'src/app/dialogs/barcode-dialog/barcode-dialog.component';
import { CreateProductDialogComponent } from 'src/app/dialogs/create-product-dialog/create-product-dialog.component';
import { ProductDetailDialogComponent } from 'src/app/dialogs/product-detail-dialog/product-detail-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private toastrService: ToastrNotifyService,
    private dialogService: DialogService,
    private fileService: FileService,
    private publicService: PublicService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'barcode',
    'category',
    'isActive',
    'createdDate',
    'actions',
  ];

  dataSource: MatTableDataSource<List_Product>;
  products: List_Product[];
  baseUrl: BaseUrl;
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    await this.getProducts();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  applyFilter() {
    const filterValue = $('#filter').val();

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: { totalProductCount: number; products: List_Product[] } =
      await this.productService.read(
        -1,
        -1,
        () => {},
        (errorMessage) =>
          this.toastrService.message(errorMessage, 'Error', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          })
      );
    allProducts.products = allProducts.products.map<List_Product>((product) => {
      const listProduct: List_Product = {
        id: product.id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        description: product.description,
        barcode: product.barcode,
        category: product.category,
        categoryId: product.categoryId,
        active: product.active,
        productImageFiles: product.productImageFiles,
        imagePath: `${
          product.productImageFiles.length
            ? product.productImageFiles.find((p) => p.showcase).path
            : ''
        }`,
        createdDate: product.createdDate,
      };
      return listProduct;
    });
    this.dataSource = new MatTableDataSource(allProducts.products);
    this.products = allProducts.products;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: '1400px',
      },
    });
  }

  createProduct() {
    this.dialogService.openDialog({
      componentType: CreateProductDialogComponent,
      data: this.createdProduct,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.getProducts();
      },
    });
  }

  editProduct(product: List_Product) {
    this.dialogService.openDialog({
      componentType: ProductDetailDialogComponent,
      data: product,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.getProducts();
      },
    });
  }

  async setActive(id: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.productService.setActiveProduct(
      id,
      () => {
        this.getProducts();
        this.hideSpinner(SpinnerType.BallAtom);
      },
      (errorMessage) =>
        this.toastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        })
    );
  }

  changeFilterValue(barcode: string) {
    $('#filter').val(barcode);
  }

  scanBarcode() {
    this.dialogService.openDialog({
      componentType: BarcodeDialogComponent,
      data: this.changeFilterValue,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.applyFilter();
      },
    });
  }

  generateExcelSheet() {
    this.publicService.generateExcelFile(this.dataSource.data, 'products');
  }
}
