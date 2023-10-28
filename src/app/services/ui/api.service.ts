import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { List_Category } from 'src/app/contracts/category/list_category';
import { CategoryService } from '../common/models/category.service';
import { ProductService } from '../common/models/product.service';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private categoryService: CategoryService,
    private cacheService: CacheService,
    private productService: ProductService
  ) {}

  async getData(data: string) {
    const cachedData = this.cacheService.get(data);
    if (cachedData) {
      return cachedData;
    } else {
      let items = [];
      switch (data) {
        case 'categories':
          items = await (
            await this.categoryService.getAllCategories(
              -1,
              -1,
              () => {},
              () => {}
            )
          ).categories;
          break;
        case 'products':
          const _items = await (
            await this.productService.read(
              -1,
              -1,
              () => {},
              () => {}
            )
          ).products;
          items = _items;
          items = items.map<List_Product>((product) => {
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
          break;
      }
      this.cacheService.set(data, items);
      return items;
    }
  }
}
