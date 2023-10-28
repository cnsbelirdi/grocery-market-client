import { Component, EventEmitter, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Create_User } from 'src/app/contracts/users/create_user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { SpinnerType } from 'src/app/base/base.component';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent extends BaseDialog<CreateUserDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EventEmitter<any>,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }

  async create(
    fullname: HTMLInputElement,
    email: HTMLInputElement,
    username: HTMLInputElement,
    phoneNumber: HTMLInputElement,
    password: HTMLInputElement
  ) {
    this.spinner.show(SpinnerType.BallAtom);
    const create_user: User = new User();
    create_user.fullName = fullname.value;
    create_user.email = email.value;
    create_user.username = username.value;
    create_user.phoneNumber = phoneNumber.value;
    create_user.password = password.value;
    create_user.passwordConfirm = password.value;

    if (
      !fullname.value ||
      !email.value ||
      !username.value ||
      !password.value ||
      !phoneNumber.value
    ) {
      this.toastrService.message(
        'Please do not leave any field empty!',
        'Warning',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      this.spinner.hide(SpinnerType.BallAtom);
      return;
    }
    const result: Create_User = await this.userService.create(create_user);

    if (result.succeeded) {
      this.spinner.show(SpinnerType.BallAtom);
      this.toastrService.message(result.message, 'User Created', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
      this.data.emit();
    } else {
      this.spinner.show(SpinnerType.BallAtom);
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
    this.spinner.hide(SpinnerType.BallAtom);
  }
}
