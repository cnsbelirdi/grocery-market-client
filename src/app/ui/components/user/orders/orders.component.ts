import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { UserOrderDetailDialogComponent } from 'src/app/dialogs/user-order-detail-dialog/user-order-detail-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService
  ) {
    super(spinner);
  }
  orders: List_Order[] = [];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    await this.getOrders();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async getOrders() {
    const user_id = (
      await this.userService.getUserByName(localStorage.getItem('name'))
    ).user.id;
    const allOrders: { totalOrderCount: number; orders: List_Order[] } =
      await this.orderService.getOrdersByUser(
        user_id,
        () => {},
        (errorMessage) =>
          this.toastrService.message(errorMessage, 'Error', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          })
      );
    this.orders = allOrders.orders;
  }

  showDetail(orderNumber: string) {
    this.dialogService.openDialog({
      componentType: UserOrderDetailDialogComponent,
      data: { orderNumber, emitFunc: this.getOrders },
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }
}
