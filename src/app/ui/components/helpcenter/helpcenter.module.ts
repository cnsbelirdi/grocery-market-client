import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpcenterComponent } from './helpcenter.component';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PaymentsModule } from './payments/payments.module';
import { RefundModule } from './refund/refund.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ShippingModule } from './shipping/shipping.module';
import { QaModule } from './qa/qa.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';

@NgModule({
  declarations: [HelpcenterComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaymentsModule,
    RefundModule,
    CheckoutModule,
    ShippingModule,
    QaModule,
    PrivacyPolicyModule,
  ],
  exports: [HelpcenterComponent],
})
export class HelpcenterModule {}
