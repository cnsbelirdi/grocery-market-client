import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Category } from 'src/app/contracts/category/list_category';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private toastrService: ToastrNotifyService,
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private basketService: BasketService
  ) {
    super(spinner);
  }

  currentPageNo: number = 1;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 10;
  pageList: number[] = [];
  baseUrl: BaseUrl;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  currentCategory: List_Category;

  products: List_Product[];

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe((params) => {
      this.currentCategory = this.categoryService.getCurrentCategory;
      this.getProducts();
    });
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async getProducts() {
    var data: { totalProductCount: number; products: List_Product[] };

    if (this.categoryService.getCurrentCategory.id == '0') {
      data = await this.productService.read(
        this.currentPageNo - 1,
        this.pageSize,
        () => {},
        (errorMessage) => {}
      );
    } else {
      data = await this.categoryService.getCategoryProducts(
        this.currentPageNo - 1,
        this.pageSize,
        () => {},
        (errorMessage) => {}
      );
    }
    this.products = data.products;

    this.products = this.products.map<List_Product>((product) => {
      const listProduct: List_Product = {
        name: product.name,
        id: product.id,
        price: product.price,
        stock: product.stock,
        createdDate: product.createdDate,
        imagePath: `${
          product.productImageFiles.length
            ? product.productImageFiles.find((p) => p.showcase).path
            : ''
        }`,
        active: product.active,
        category: product.category,
        productImageFiles: product.productImageFiles,
      };
      return listProduct;
    });

    this.totalProductCount = data.totalProductCount;
    this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallAtom);
    if (this.authService.isAuthenticated) {
      let _basketItem: Create_Basket_Item = new Create_Basket_Item();
      _basketItem.productId = product.id;
      _basketItem.quantity = 1;

      await this.basketService.add(_basketItem);

      this.hideSpinner(SpinnerType.BallAtom);

      this.toastrService.message(
        'Product added into basket successfully!',
        'Added successfully',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    } else {
      this.toastrService.message(
        'You must login to the website to add the product into basket!',
        'Authentication Required!',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    }
  }

  async changePage(event: PageEvent) {
    this.showSpinner(SpinnerType.BallAtom);
    this.pageSize = event.pageSize;
    this.currentPageNo = event.pageIndex + 1;
    await this.getProducts();
    this.hideSpinner(SpinnerType.BallAtom);
  }
}
