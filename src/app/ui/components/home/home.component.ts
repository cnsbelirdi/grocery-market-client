import { Component, OnInit, ViewChild } from '@angular/core';
import { List_Category } from 'src/app/contracts/category/list_category';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ExploreCategoriesComponent } from './explore-categories/explore-categories.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product } from 'src/app/contracts/list_product';
import { TopSellsProductsComponent } from './top-sells-products/top-sells-products.component';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    super(spinner);
  }
  data: List_Category[];
  categories: List_Category[] = [
    { id: '0', name: 'All', createdDate: new Date(2023) },
  ];

  products: List_Product[];

  @ViewChild(ExploreCategoriesComponent)
  exploreComponents: ExploreCategoriesComponent;
  @ViewChild(TopSellsProductsComponent)
  topSellsComponents: TopSellsProductsComponent;

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    await this.getCategories();
    await this.getProducts();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async getCategories() {
    const _categories: List_Category[] = (
      await this.categoryService.getAllCategories(-1, -1)
    ).categories;
    this.categories = this.categories.concat(_categories);
    this.exploreComponents.setCategories(this.categories);
    this.topSellsComponents.setCategories(this.categories);
  }

  async getProducts() {
    const _products: List_Product[] = (await this.productService.read(-1, -1))
      .products;
    this.products = _products.map<List_Product>((product) => {
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
    this.exploreComponents.setProducts(this.products);
    this.topSellsComponents.setProducts(this.products);
  }

  offers = [
    {
      id: 1,
      bgColor: '#FFF5E1',
      title: 'Free delivery over $8',
      description: 'Shop $8 product and get free delivery anywhere!',
      label: 'Free delivery',
      labelColor: '#FFD480',
      img: 'https://i.hizliresim.com/j48qryj.png',
    },
    {
      id: 2,
      bgColor: '#D2EFE1',
      title: 'First order',
      description: 'Save up to 60% off on your first order!',
      label: '60% off',
      labelColor: '#3BB77E',
      img: 'https://i.hizliresim.com/qzkrclr.png',
    },
  ];
}
