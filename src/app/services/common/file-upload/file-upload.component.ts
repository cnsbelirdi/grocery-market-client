import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from '../toastr-notify.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private customToastrService: ToastrNotifyService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallAtom);
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              const message: string = 'Files uploaded successfully!';

              this.spinner.hide(SpinnerType.BallAtom);
              this.customToastrService.message(message, 'Success!', {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              });
            },
            (errorResponse: HttpErrorResponse) => {
              const message: string =
                'Somethings failed when trying to upload the files!';

              this.spinner.hide(SpinnerType.BallAtom);
              this.customToastrService.message(message, 'Error!', {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              });
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  multiple?: boolean;
}
