import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-order-complete-dialog',
  templateUrl: './order-complete-dialog.component.html',
  styleUrls: ['./order-complete-dialog.component.scss'],
})
export class OrderCompleteDialogComponent
  extends BaseDialog<OrderCompleteDialogComponent>
  implements OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<OrderCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteState
  ) {
    super(dialogRef);
  }

  show: boolean = false;
  complete() {
    this.show = true;
  }
  ngOnDestroy(): void {
    if (!this.show) {
      $('#basketModal').modal('show');
    }
  }
}
export enum CompleteState {
  Yes,
  No,
}
