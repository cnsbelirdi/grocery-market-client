import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-barcode-dialog',
  templateUrl: './barcode-dialog.component.html',
  styleUrls: ['./barcode-dialog.component.scss'],
})
export class BarcodeDialogComponent extends BaseDialog<BarcodeDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<BarcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    super(dialogRef);
  }
  value: string;
  isError = false;
  onError(error: any) {
    console.error(error);
    this.isError = true;
  }
  onValueChange() {
    this.data(this.value);
    this.dialogRef.close(this.data);
  }
}
