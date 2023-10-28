import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SinglePayment } from 'src/app/contracts/payment/single_payment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { PaymentService } from 'src/app/services/common/models/payment.service';
import { MatSelect } from '@angular/material/select';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-update-payment-dialog',
  templateUrl: './update-payment-dialog.component.html',
  styleUrls: ['./update-payment-dialog.component.scss'],
})
export class UpdatePaymentDialogComponent extends BaseDialog<UpdatePaymentDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<UpdatePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SinglePayment,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService,
    private paymentService: PaymentService
  ) {
    super(dialogRef);
  }

  edit(
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
      const edit_payment: SinglePayment = new SinglePayment();
      edit_payment.id = this.data.id;
      edit_payment.amount = parseFloat(amount.value);
      edit_payment.information = information.value;
      edit_payment.type = type.value;

      this.paymentService.update(
        edit_payment,
        () => {
          this.spinner.hide(SpinnerType.BallAtom);
          this.toastrService.message(
            'The changes have been saved!',
            'Success',
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            }
          );
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
