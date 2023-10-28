import { Component, EventEmitter, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { PaymentService } from 'src/app/services/common/models/payment.service';
import { MatSelect } from '@angular/material/select';
import { SpinnerType } from 'src/app/base/base.component';
import { CreatePayment } from 'src/app/contracts/payment/create_payment';

@Component({
  selector: 'app-create-payment-dialog',
  templateUrl: './create-payment-dialog.component.html',
  styleUrls: ['./create-payment-dialog.component.scss'],
})
export class CreatePaymentDialogComponent extends BaseDialog<CreatePaymentDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CreatePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EventEmitter<any>,
    private spinner: NgxSpinnerService,
    private paymentService: PaymentService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }

  create(
    amount: HTMLInputElement,
    information: HTMLTextAreaElement,
    type: MatSelect
  ) {
    this.spinner.show(SpinnerType.BallAtom);

    if (!amount.value || !type.value) {
      this.toastrService.message(
        'Please do not leave amount or type field empty!',
        'Warning',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      this.spinner.hide(SpinnerType.BallAtom);
    } else if (parseInt(amount.value) < 0) {
      this.toastrService.message('The amount can not be negative!', 'Warning', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
      this.spinner.hide(SpinnerType.BallAtom);
    } else {
      const create_payment: CreatePayment = new CreatePayment();
      create_payment.amount = parseFloat(amount.value);
      create_payment.information = information.value;
      create_payment.type = type.value;
      this.paymentService.create(
        create_payment,
        () => {
          this.spinner.hide(SpinnerType.BallAtom);
          this.toastrService.message(
            'Payment created successfully!',
            'Success',
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            }
          );
          this.data.emit();
        },
        (errorMessage) => {
          this.toastrService.message(errorMessage, 'Error', {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          });
        }
      );
    }
  }
}
