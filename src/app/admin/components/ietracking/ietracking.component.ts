import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { IeListComponent } from './ie-list/ie-list.component';
import { SinglePayment } from 'src/app/contracts/payment/single_payment';
import { PublicService } from 'src/app/services/common/public.service';

@Component({
  selector: 'app-ietracking',
  templateUrl: './ietracking.component.html',
  styleUrls: ['./ietracking.component.scss'],
})
export class IetrackingComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private publicService: PublicService
  ) {
    super(spinner);
  }
  tableRowCounts: number[] = [];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.tableRowCounts = await this.publicService.getCounts('payments');
  }

  @ViewChild(IeListComponent) listComponents: IeListComponent;

  createdPayment() {
    this.listComponents.getPayments();
  }
}
