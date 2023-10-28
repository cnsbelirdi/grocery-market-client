import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCacheData, updateCacheData } from './cache.actions';
import { AppState } from './cache.reducer';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../services/common/http-client.service';
import { List_Product } from '../contracts/list_product';
import { List_Category } from '../contracts/category/list_category';
import { ProductService } from '../services/common/models/product.service';
import { CategoryService } from '../services/common/models/category.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  async getData(key: string, successCallBack?: () => void): Promise<any> {
    return new Promise((resolve, reject) => {
      const cacheSelector = (state: AppState) => state.cache[key];
      const cachedData$ = this.store.pipe(select(cacheSelector));

      const subscription = cachedData$.subscribe({
        next: async (cachedData) => {
          if (cachedData) {
            console.log('Reducer');
            resolve(cachedData);
          } else {
            let items = [];
            switch (key) {
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
            }
            this.store.dispatch(setCacheData({ key, data: items }));
            resolve(items);
          }
        },
        error: (error) => reject(error),
        complete: () => {
          successCallBack();
        },
      });
      subscription.unsubscribe();
    });
  }

  updateData(key: string, newData: any): void {
    this.store.dispatch(updateCacheData({ key, updatedData: newData }));
  }
}
