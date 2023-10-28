import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { HotdealsModule } from './hotdeals/hotdeals.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { BillsModule } from './bills/bills.module';
import { IetrackingModule } from './ietracking/ietracking.module';
import { CategoryModule } from 'src/app/ui/components/category/category.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationModule } from './authorization/authorization.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    MarketplaceModule,
    OrdersModule,
    CustomersModule,
    CategoryModule,
    HotdealsModule,
    PromotionsModule,
    ComplaintsModule,
    BillsModule,
    IetrackingModule,
    AuthorizationModule,
  ],
})
export class ComponentsModule {}
