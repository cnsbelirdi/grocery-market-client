import { Component, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Category } from 'src/app/contracts/category/list_category';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.scss'],
})
export class ExploreCategoriesComponent implements OnInit {
  constructor(private fileService: FileService) {}
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

  getRandomColor(index: number): string {
    const bg = index % 2 === 0 ? '#def9ec' : '#f2fce4';
    return bg;
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
}
