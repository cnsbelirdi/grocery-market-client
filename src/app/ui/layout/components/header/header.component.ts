import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { BasketComponent } from './basket/basket.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseUrl } from 'src/app/contracts/base_url';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild(BasketComponent) basketComponent: BasketComponent;

  totalPrice: number = 0;
  username: string;
  username_short: string;
  products: List_Product[] = [];
  baseUrl: BaseUrl;
  searching: boolean = false;
  constructor(
    public authService: AuthService,
    private toastrService: ToastrNotifyService,
    private userService: UserService,
    private router: Router,
    private productService: ProductService,
    private fileService: FileService
  ) {
    authService.identityCheck();
  }
  async ngOnInit() {
    const email = localStorage.getItem('name');
    if (email) {
      const user = (await this.userService.getUserByName(email)).user;
      this.username = user.fullName;
      const name = this.username.split(' ');
      if (name.length > 1)
        this.username_short =
          name[0].charAt(0) + name[name.length - 1].charAt(0);
      else this.username_short = name[0].charAt(0);
    }
    this.baseUrl = await this.fileService.getBaseStorageUrl();
  }

  ngAfterViewInit() {
    $('#basket').click(function (event) {
      event.stopPropagation();

      $('#currentBasket').toggle();

      $(document).on('click', function (event) {
        if (
          !$(event.target).closest('#currentBasket').length &&
          $('#currentBasket').is(':visible')
        ) {
          $('#currentBasket').hide();
        }
      });
    });
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message(
      'Account has been logged out!',
      'Logout Successfully!',
      {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      }
    );
  }

  async getProducts() {
    let _products: List_Product[] = (await this.productService.read(-1, -1))
      .products;
    _products = _products.map<List_Product>((product) => {
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
    return _products;
  }

  async searchProducts(event: Event) {
    this.searching = true;
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != '') {
      const filteredProducts = (await this.getProducts()).filter((product) => {
        return product.name.toLowerCase().includes(filterValue.toLowerCase());
      });
      this.products = filteredProducts;
    } else {
      this.products = [];
    }
  }

  async loadComponent() {
    await this.basketComponent.loadItems();
  }

  clear(input: HTMLInputElement) {
    input.value = '';
    this.products = [];
    this.searching = false;
  }
}
