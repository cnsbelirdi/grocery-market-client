import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderBillDialogComponent } from 'src/app/dialogs/order-bill-dialog/order-bill-dialog.component';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'username',
    'totalPrice',
    'status',
    'createdDate',
    'actions',
  ];
  dataSource: MatTableDataSource<List_Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() completedOrder = new EventEmitter();

  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private toastrService: ToastrNotifyService,
    private dialogService: DialogService,
    private publicService: PublicService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    await this.getOrders();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.hideSpinner(SpinnerType.BallAtom);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallAtom);
    const allOrders: { totalOrderCount: number; orders: List_Order[] } =
      await this.orderService.getAllOrders(
        -1,
        -1,
        () => {},
        (errorMessage) =>
          this.toastrService.message(errorMessage, 'Error', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
  }

  showDetail(orderNumber: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: orderNumber,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.getOrders();
      },
    });
  }
  generateBill(orderNumber: string) {
    this.dialogService.openDialog({
      componentType: OrderBillDialogComponent,
      data: orderNumber,
      options: {
        width: '384px',
      },
      afterClosed: () => {},
    });
  }
  exportData() {
    this.publicService.generateExcelFile(this.dataSource.data, 'orders');
  }
}
