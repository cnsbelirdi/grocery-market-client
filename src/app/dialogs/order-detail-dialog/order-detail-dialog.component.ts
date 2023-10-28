import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  CompleteOrderDialogComponent,
  CompleteOrderState,
} from '../complete-order-dialog/complete-order-dialog.component';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
})
export class OrderDetailDialogComponent
  extends BaseDialog<OrderDetailDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }

  singleOrder: Single_Order;
  totalPrice: number;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.singleOrder = await this.orderService.getOrderByNumber(
      this.data,
      () => this.spinner.hide(SpinnerType.BallAtom),
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      }
    );
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.totalPrice;
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        await this.orderService.completeOrder(this.singleOrder.id);
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message(
          'Order completed successfully and customer informed via email!',
          'Success!',
          {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          }
        );
      },
    });
  }
}

export enum DetailState {
  Close,
  OrderComplete,
}
