import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_Order } from 'src/app/contracts/order/list_order';
import { Single_Order } from 'src/app/contracts/order/single_order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'orders',
      },
      order
    );

    await firstValueFrom(observable);
  }

  async getAllOrders(
    page: number = 0,
    size: number = 5,
    successCalback?: () => void,
    errorCallback?: (error: string) => void
  ): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: List_Order[];
    }> = this.httpClientService.get({
      controller: 'orders',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCalback())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async getOrdersByUser(
    userId: string,
    successCalback?: () => void,
    errorCallback?: (error: string) => void
  ): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: List_Order[];
    }> = this.httpClientService.get(
      {
        controller: 'orders',
        action: 'GetOrdersByUser',
      },
      userId
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCalback())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async getOrderByNumber(
    number: string,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ) {
    const observable: Observable<Single_Order> =
      this.httpClientService.get<Single_Order>(
        {
          controller: 'orders',
        },
        number
      );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => {
        successCallback();
      })
      .catch((error) => {
        errorCallback(error);
      });

    return await promiseData;
  }

  async completeOrder(id: string) {
    const observable: Observable<any> = this.httpClientService.get(
      {
        controller: 'orders',
        action: 'complete-order',
      },
      id
    );
    await firstValueFrom(observable);
  }
}
