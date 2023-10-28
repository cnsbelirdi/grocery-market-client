import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderStepperComponent } from './order-stepper/order-stepper.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { CardPaymentComponent } from './card-payment/card-payment.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderStepperComponent,
    OrderSummaryComponent,
    CardPaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
  ],
})
export class OrderModule {}
