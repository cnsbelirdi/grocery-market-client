import { Component, EventEmitter, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/services/common/models/role.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.scss'],
})
export class CreateRoleDialogComponent extends BaseDialog<CreateRoleDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CreateRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EventEmitter<any>,
    private spinner: NgxSpinnerService,
    private roleService: RoleService,
    private toastrService: ToastrNotifyService
  ) {
    super(dialogRef);
  }

  async create(name: HTMLInputElement) {
    this.spinner.show(SpinnerType.BallAtom);

    if (!name.value) {
      this.toastrService.message(
        'Please do not leave name field empty!',
        'Warning',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      this.spinner.hide(SpinnerType.BallAtom);
      return;
    }
    this.roleService.create(
      name.value,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message('Role created successfully!', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
        this.data.emit();
      },
      (errorMessage) => {
        this.toastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );

    this.spinner.hide(SpinnerType.BallAtom);
  }
}
