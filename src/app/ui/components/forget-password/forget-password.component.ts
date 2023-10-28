import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private toastrService: ToastrNotifyService
  ) {
    super(spinner);
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.BallAtom);
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.toastrService.message('Mail sent succesfully!', 'Mail Sent', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft,
      });
    });
  }
}
