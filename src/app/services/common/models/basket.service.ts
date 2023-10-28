import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from '../toastr-notify.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrNotifyService
  ) {}

  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> =
      this.httpClientService.get({
        controller: 'baskets',
      });
    return await firstValueFrom(observable);
  }

  async add(basketItem: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'baskets',
      },
      basketItem
    );
    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    debugger;
    const observable: Observable<any> = this.httpClientService.put(
      {
        controller: 'baskets',
      },
      basketItem
    );
    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => {
        this.toastrService.message(
          'Product quantity updated successfully!',
          'Quantity Updated!',
          {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.TopRight,
          }
        );
      })
      .catch((error) => {});

    return await promiseData;
  }

  async remove(basketItemId: string): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete(
      {
        controller: 'baskets',
      },
      basketItemId
    );
    await firstValueFrom(observable);
  }
}
