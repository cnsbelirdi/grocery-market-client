import { Component } from '@angular/core';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  constructor(
    private basketService: BasketService,
    private fileService: FileService
  ) {}
  basketItems: List_Basket_Item[] = [];
  totalPrice: number;
  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    await this.loadItems();
  }

  async loadItems() {
    this.basketItems = await this.basketService.get();
    this.totalPrice = 0;
    this.basketItems.forEach(
      (item) => (this.totalPrice += item.price * item.quantity)
    );
  }
}
