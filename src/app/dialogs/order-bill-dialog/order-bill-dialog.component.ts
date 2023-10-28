import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import html2canvas from 'html2canvas';
import { PublicService } from 'src/app/services/common/public.service';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

declare var $: any;

@Component({
  selector: 'app-order-bill-dialog',
  templateUrl: './order-bill-dialog.component.html',
  styleUrls: ['./order-bill-dialog.component.scss'],
})
export class OrderBillDialogComponent
  extends BaseDialog<OrderBillDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<OrderBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    private publicService: PublicService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }
  @ViewChild('divToPrint', { static: false }) divToPrint: ElementRef;
  order: Single_Order;
  ngOnInit(): void {
    this.spinner.show(SpinnerType.BallAtom);
    this.getOrder();
    this.spinner.hide(SpinnerType.BallAtom);
  }

  async getOrder() {
    this.order = await this.orderService.getOrderByNumber(this.data);
  }

  print() {
    $('#printer').hide();
    this.publicService.printBill(this.divToPrint);
  }
}
