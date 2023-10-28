import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { SinglePayment } from 'src/app/contracts/payment/single_payment';
import { CreatePaymentDialogComponent } from 'src/app/dialogs/create-payment-dialog/create-payment-dialog.component';
import { UpdatePaymentDialogComponent } from 'src/app/dialogs/update-payment-dialog/update-payment-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { PaymentService } from 'src/app/services/common/models/payment.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-ie-list',
  templateUrl: './ie-list.component.html',
  styleUrls: ['./ie-list.component.scss'],
})
export class IeListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'type',
    'information',
    'amount',
    'createdDate',
    'actions',
  ];
  dataSource: MatTableDataSource<SinglePayment>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createdPayment: EventEmitter<any> = new EventEmitter();

  constructor(
    spinner: NgxSpinnerService,
    private paymentService: PaymentService,
    private toastrService: ToastrNotifyService,
    private dialogService: DialogService,
    private publicService: PublicService
  ) {
    super(spinner);
  }
  async ngOnInit() {
    await this.getPayments();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.hideSpinner(SpinnerType.BallAtom);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPayments() {
    this.showSpinner(SpinnerType.BallAtom);
    debugger;
    const allPayments: { payments: SinglePayment[] } =
      await this.paymentService.read(
        () => {},
        (errorMessage) => {}
      );
    this.dataSource = new MatTableDataSource<SinglePayment>(
      allPayments.payments
    );
  }

  exportData() {
    this.publicService.generateExcelFile(this.dataSource.data, 'payments');
  }

  createPayment() {
    this.dialogService.openDialog({
      componentType: CreatePaymentDialogComponent,
      data: this.createdPayment,
      options: {
        width: '750px',
      },
    });
  }

  editPayment(payment: SinglePayment) {
    this.dialogService.openDialog({
      componentType: UpdatePaymentDialogComponent,
      data: payment,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.getPayments();
      },
    });
  }
}
