import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Category } from 'src/app/contracts/category/list_category';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-top-sells-products',
  templateUrl: './top-sells-products.component.html',
  styleUrls: ['./top-sells-products.component.scss'],
})
export class TopSellsProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private fileService: FileService,
    private authService: AuthService,
    private basketService: BasketService,
    private toastrService: ToastrNotifyService
  ) {
    super(spinner);
  }
  categories: List_Category[];
  products: List_Product[];
  filteredProduct: List_Product[];
  baseUrl: BaseUrl;
  selectedCategory: string = 'All';

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
  }

  onSwiper(swiper) {}
  onSlideChange() {}

  setCategories(items: List_Category[]) {
    this.categories = items;
  }
  setProducts(items: List_Product[]) {
    this.products = items;
    this.filterProducts(this.selectedCategory);
  }

  filterProducts(category: string) {
    if (category === 'All') {
      this.filteredProduct = this.products;
    } else {
      const _product = this.products.filter((p) => p.category === category);
      this.filteredProduct = _product;
    }
    this.selectedCategory = category;
  }

  async addToBasket(product: List_Product) {
    if (this.authService.isAuthenticated) {
      this.showSpinner(SpinnerType.BallAtom);
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
}
