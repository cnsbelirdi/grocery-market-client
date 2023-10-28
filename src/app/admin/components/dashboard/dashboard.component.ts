import { Component, OnInit } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { ProductDetailDialogComponent } from 'src/app/dialogs/product-detail-dialog/product-detail-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PublicService } from 'src/app/services/common/public.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private publicService: PublicService,
    private dialogService: DialogService
  ) {}
  tableRowCounts: number[] = [];
  orders: List_Order[] = [];
  products: List_Product[] = [];
  async ngOnInit() {
    this.tableRowCounts = await this.publicService.getCounts('all');
    await this.getOrders();
    await this.getProducts();
  }

  async getOrders() {
    this.orders = await this.publicService.getWaitingOrders();
  }
  async getProducts() {
    this.products = await this.publicService.getNoStockProducts();
  }
  showDetail(orderNumber: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: orderNumber,
      options: {
        width: '750px',
      },
      afterClosed: async () => {
        await this.getOrders();
      },
    });
  }
  editProduct(product: List_Product) {
    this.dialogService.openDialog({
      componentType: ProductDetailDialogComponent,
      data: product,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.getProducts();
      },
    });
  }
}
