import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PublicService } from 'src/app/services/common/public.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private publicService: PublicService
  ) {
    super(spinner);
  }
  tableRowCounts: number[] = [];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.tableRowCounts = await this.publicService.getCounts('orders');
  }

  @ViewChild(OrderListComponent) listComponents: OrderListComponent;

  completedOrder() {
    this.listComponents.getOrders();
  }
}
