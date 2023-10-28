import { Component, Inject, EventEmitter } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { List_User } from 'src/app/contracts/users/list_user';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent extends BaseDialog<UpdateUserDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; type },
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }

  async update(input: HTMLInputElement) {
    this.spinner.show(SpinnerType.BallAtom);

    const value = input.value;

    if (!value) {
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
    } else {
      let _user = new User();
      _user = this.data.user;
      switch (this.data.type) {
        case 'fullname':
          _user.fullName = value;
          break;
        case 'username':
          _user.username = value;
          localStorage.setItem('name', value);
          break;
        case 'email':
          _user.email = value;
          break;
        case 'phoneNumber':
          _user.phoneNumber = value;
          break;
      }
      const result: Create_User = await this.userService.update(_user);

      if (result.succeeded) {
        if (result.accessToken)
          localStorage.setItem('accessToken', result.accessToken);
        this.spinner.show(SpinnerType.BallAtom);
        this.toastrService.message(result.message, 'User Updated', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      } else {
        this.spinner.show(SpinnerType.BallAtom);
        this.toastrService.message(result.message, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    }
    this.spinner.hide(SpinnerType.BallAtom);
  }
}
