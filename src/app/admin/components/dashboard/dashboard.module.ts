import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  matShoppingBagOutline,
  matShoppingBasketOutline,
  matPeopleAltOutline,
  matAttachMoneyOutline,
  matAccountBalanceWalletOutline,
} from '@ng-icons/material-icons/outline';
import { LineChartComponent } from './linechart/linechart.component';
import { DoughnutChartComponent } from './doughnutchart/doughnutchart.component';
import { BarChartComponent } from './barchart/barchart.component';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    DeleteDirectiveModule,
    DialogModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    NgIconsModule.withIcons({
      matShoppingBagOutline,
      matShoppingBasketOutline,
      matPeopleAltOutline,
      matAttachMoneyOutline,
      matAccountBalanceWalletOutline,
    }),
  ],
})
export class DashboardModule {}
