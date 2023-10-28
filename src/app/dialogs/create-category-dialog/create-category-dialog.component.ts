import { Component, EventEmitter, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/common/models/category.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss'],
})
export class CreateCategoryDialogComponent extends BaseDialog<CreateCategoryDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: EventEmitter<any>,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
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
    this.categoryService.create(
      name.value,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.toastrService.message(
          'Category created successfully!',
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

    this.spinner.hide(SpinnerType.BallAtom);
  }
}
