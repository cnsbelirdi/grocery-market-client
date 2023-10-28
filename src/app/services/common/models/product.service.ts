import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';
import { Update_Product } from 'src/app/contracts/update_product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br/>`;
            });
          });
          errorCallback(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 12,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const observable: Observable<{
      totalProductCount: number;
      products: List_Product[];
    }> = this.httpClientService.get<{
      totalProductCount: number;
      products: List_Product[];
    }>({
      controller: 'products',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );

    await firstValueFrom(deleteObservable);
  }

  async update(
    product: Update_Product,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .put(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br/>`;
            });
          });
          errorCallback(message);
        }
      );
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getproductimages',
          controller: 'products',
        },
        id
      );
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteproductimage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(
    imageId: string,
    productId: string,
    successCallBack?: () => void
  ): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: 'products',
      action: 'ChangeShowcaseImage',
      queryString: `imageId=${imageId}&productId=${productId}`,
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }

  async setActiveProduct(
    id: string,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.put(
      {
        controller: 'products',
        action: 'set-active',
      },
      { id }
    );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async getProductById(
    productId: string,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ product: List_Product }> {
    const observable: Observable<{ product: List_Product }> =
      this.httpClientService.get<{ product: List_Product }>(
        {
          controller: 'products',
        },
        productId
      );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }
}
