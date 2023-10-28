import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private toastrService: ToastrNotifyService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer');
    img.width = 24;
    img.height = 24;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        const observable: Observable<any> = this.httpClientService.delete(
          {
            controller: this.controller,
          },
          this.id
        );

        const promiseData = firstValueFrom(observable);
        promiseData
          .then(() => {
            if (this.controller == 'orders') {
              this.callback.emit();
              this.toastrService.message(
                `The order was successfully canceled!`,
                'Canceled Order',
                {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                }
              );
            } else {
              $(td.parentElement).animate(
                {
                  opacity: 0,
                  left: '+=50',
                  height: 'toggle',
                },
                700,
                () => {
                  this.callback.emit();
                  var deletedName;
                  switch (this.controller) {
                    case 'products':
                      deletedName = 'product';
                      break;
                    case 'roles':
                      deletedName = 'role';
                      break;
                    case 'payments':
                      deletedName = 'payments';
                      break;
                    default:
                      deletedName = 'item';
                      break;
                  }
                  this.toastrService.message(
                    `The ${deletedName} was successfully deleted!`,
                    'Delete',
                    {
                      messageType: ToastrMessageType.Success,
                      position: ToastrPosition.TopRight,
                    }
                  );
                }
              );
            }
          })
          .catch((error) => {
            this.toastrService.message(error, 'Error', {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,
            });
          });

        return await promiseData;
      },
    });
  }
}
