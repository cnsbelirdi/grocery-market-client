import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(diaglogParams: Partial<DialogParams>): void {
    const dialogRef = this.dialog.open(diaglogParams.componentType, {
      width: diaglogParams.options?.width,
      height: diaglogParams.options?.height,
      position: diaglogParams.options?.position,
      data: diaglogParams.data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == diaglogParams.data) {
        diaglogParams.afterClosed();
      }
    });
  }
}

export class DialogParams {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions {
  width?: string = '250px';
  height?: string;
  position?: DialogPosition;
}
