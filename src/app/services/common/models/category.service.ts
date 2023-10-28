import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { List_Category } from 'src/app/contracts/category/list_category';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClientService: HttpClientService) {}
  get getCurrentCategory(): List_Category {
    return _currentCategory;
  }

  setCurrentCategory(category: List_Category) {
    _currentCategory = category;
  }

  async getAllCategories(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ): Promise<{ totalCategoryCount: number; categories: List_Category[] }> {
    const observable: Observable<{
      totalCategoryCount: number;
      categories: List_Category[];
    }> = this.httpClientService.get({
      controller: 'categories',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => {}).catch((error) => {});

    return await promiseData;
  }

  async getCategoryProducts(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const observable: Observable<{
      totalProductCount: number;
      products: List_Product[];
    }> = this.httpClientService.get({
      controller: 'categories',
      action: 'get-category-products',
      queryString: `page=${page}&size=${size}&id=${_currentCategory.id}`,
    });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallback())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async create(
    name: string,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'categories',
      },
      { name: name }
    );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallback())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async delete(
    id: string,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.delete(
      {
        controller: 'categories',
      },
      id
    );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallback())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }
}

export let _currentCategory: List_Category = {
  id: '0',
  name: 'All',
  createdDate: new Date(2000),
};
