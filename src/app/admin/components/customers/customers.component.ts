import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { Create_User } from 'src/app/contracts/users/create_user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }

  @ViewChild(CustomerListComponent) listComponents: CustomerListComponent;

  createdUser() {
    this.listComponents.getUsers();
  }
}
