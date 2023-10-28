import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrNotifyService,
    private userService: UserService,
    private router: Router
  ) {
    super(spinner);
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        this.state = await this.userAuthService.verifyResetToken(
          resetToken,
          userId,
          () => {
            this.hideSpinner(SpinnerType.BallAtom);
          }
        );
      },
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.BallAtom);
    if (password != passwordConfirm) {
      this.toastrService.message('Confirm Password please..', 'Warning!', {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      });
      this.hideSpinner(SpinnerType.BallAtom);
      return;
    }
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        await this.userService.updatePassword(
          userId,
          resetToken,
          password,
          passwordConfirm,
          () => {
            this.hideSpinner(SpinnerType.BallAtom);
            this.toastrService.message(
              'Password updated successfully!',
              'Success!',
              {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              }
            );
            this.router.navigate(['/login']);
          },
          (error) => {}
        );
      },
    });
  }
}
