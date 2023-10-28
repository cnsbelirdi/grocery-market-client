import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private basketService: BasketService,
    private toastrService: ToastrNotifyService
  ) {
    super(spinner);
  }

  currentProduct: List_Product;
  baseUrl: BaseUrl;
  quantity: number = 1;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async (params) => {
      const id = params['id'];
      this.currentProduct = (
        await this.productService.getProductById(id)
      ).product;
      this.currentProduct.imagePath = this.currentProduct.productImageFiles
        .length
        ? this.currentProduct.productImageFiles.find((p) => p.showcase).path
        : '';
      this.currentProduct.id = id;
    });
  }

  async addToBasket() {
    this.showSpinner(SpinnerType.BallAtom);
    if (this.authService.isAuthenticated) {
      let _basketItem: Create_Basket_Item = new Create_Basket_Item();
      _basketItem.productId = this.currentProduct.id;
      _basketItem.quantity = this.quantity;

      await this.basketService.add(_basketItem);

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

    this.hideSpinner(SpinnerType.BallAtom);
  }
}
