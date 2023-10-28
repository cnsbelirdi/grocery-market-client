import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  CompleteState,
  OrderCompleteDialogComponent,
} from 'src/app/dialogs/order-complete-dialog/order-complete-dialog.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private authService: AuthService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService,
    private fileService: FileService
  ) {
    super(spinner);
  }
  basketItems: List_Basket_Item[] = [];

  totalPrice: number;
  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
  }

  async loadItems() {
    if (this.authService.isAuthenticated) {
      this.basketItems = await this.basketService.get();
      this.totalPrice = 0;
      this.basketItems.forEach(
        (item) => (this.totalPrice += item.price * item.quantity)
      );
    }
    this.hideSpinner(SpinnerType.BallAtom);
  }

  removeBasketItem(basketItemId: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId);
        $('.' + basketItemId).fadeOut(500, () =>
          this.hideSpinner(SpinnerType.BallAtom)
        );
        this.toastrService.message(
          'Product deleted successfully from basket!',
          'Product deleted!',
          {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.TopRight,
          }
        );
        this.loadItems();
      },
    });
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = parseInt(object.target.value);
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;

    await this.basketService.updateQuantity(basketItem);
    this.loadItems();
    this.hideSpinner(SpinnerType.BallAtom);
  }
}
