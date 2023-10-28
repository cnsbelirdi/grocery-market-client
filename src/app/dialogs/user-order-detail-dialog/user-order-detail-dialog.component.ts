import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/services/common/dialog.service';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-user-order-detail-dialog',
  templateUrl: './user-order-detail-dialog.component.html',
  styleUrls: ['./user-order-detail-dialog.component.scss'],
})
export class UserOrderDetailDialogComponent
  extends BaseDialog<UserOrderDetailDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<UserOrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { orderNumber; emitFunc: any },
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
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
    await this.getOrder();
    this.spinner.hide(SpinnerType.BallAtom);
  }

  async getOrder() {
    this.singleOrder = await this.orderService.getOrderByNumber(
      this.data.orderNumber,
      () => {},
      () => {}
    );
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.totalPrice;
  }
}
