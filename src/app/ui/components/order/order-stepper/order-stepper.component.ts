import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_User } from 'src/app/contracts/users/list_user';
import {
  CompleteState,
  OrderCompleteDialogComponent,
} from 'src/app/dialogs/order-complete-dialog/order-complete-dialog.component';
import { User } from 'src/app/entities/user';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-order-stepper',
  templateUrl: './order-stepper.component.html',
  styleUrls: ['./order-stepper.component.scss'],
})
export class OrderStepperComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private toastrService: ToastrNotifyService,
    private userService: UserService,
    private router: Router
  ) {
    super(spinner);
  }
  dates: string[];
  times: string[];
  user: User;
  paymentOption: string;
  isPaid: boolean;

  async ngOnInit() {
    await this.getUserInfo();
    this.dates = this.getFirstThreeDays();
    this.times = this.getWorkingHours(new Date());
    console.log(this.times);
  }

  setPaid($event) {
    this.isPaid = $event.state;
  }

  completeOrder(
    address: HTMLInputElement,
    description: HTMLInputElement,
    date: HTMLSelectElement,
    time: HTMLSelectElement,
    approve: any
  ) {
    if (address.value == '' || this.paymentOption == null) {
      this.toastrService.message(
        'You cannot leave the address or payment option blank!',
        'Check information!',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    } else if (approve.checked == false) {
      this.toastrService.message(
        'You have to read and approve Distance Sales Agreement and Preliminary Information Form!',
        'Check information!',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    } else if (!this.isPaid && this.paymentOption == '1') {
      this.toastrService.message(
        'Please enter your card information!',
        'Payment information missing!',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    } else {
      this.dialogService.openDialog({
        componentType: OrderCompleteDialogComponent,
        data: CompleteState.Yes,
        afterClosed: async () => {
          this.showSpinner(SpinnerType.BallAtom);
          const order: Create_Order = new Create_Order();
          order.address = address.value;
          order.description = description.value;
          order.deliveryTime = date.value + ' | ' + time.value;
          order.paymentOption = this.paymentOption;
          await this.orderService.create(order);
          this.hideSpinner(SpinnerType.BallAtom);
          this.router.navigate(['']);
          this.toastrService.message(
            'Order created successfully!',
            'Order Created!',
            {
              messageType: ToastrMessageType.Info,
              position: ToastrPosition.TopRight,
            }
          );
        },
      });
    }
  }

  getFirstThreeDays(): string[] {
    const currentDate = new Date();
    const firstThreeDays: string[] = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + i
      );
      const formattedDate = this.formatDate(date);
      firstThreeDays.push(formattedDate);
    }

    return firstThreeDays;
  }

  formatDate(date: Date): string {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(
      'en-US',
      options as Intl.DateTimeFormatOptions
    );
  }

  getWorkingHours(currentTime: Date): string[] {
    const startHour = 8; // Start hour (08:00)
    const endHour = 22; // End hour (22:00)
    const interval = 30; // Interval in minutes

    const workingHours: string[] = [];

    let nextWorkingHour = new Date(currentTime);
    nextWorkingHour.setHours(startHour, 0, 0, 0);

    const lastWorkingHour = new Date(currentTime);
    lastWorkingHour.setHours(endHour, 0, 0, 0);

    while (nextWorkingHour < lastWorkingHour) {
      const start = nextWorkingHour.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      nextWorkingHour.setMinutes(nextWorkingHour.getMinutes() + interval);

      const end = nextWorkingHour.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      workingHours.push(`${start} - ${end}`);
    }

    return workingHours;
  }

  getNextWorkingHours(nextHour: Date): string[] {
    const startHour = 8; // Start hour (08:00)
    const endHour = 22; // End hour (21:00)
    const interval = 30; // Interval in minutes

    const workingHours: string[] = [];

    let nextWorkingHour = new Date(nextHour);
    nextWorkingHour.setHours(startHour, 0, 0, 0);
    nextWorkingHour.setMinutes(
      Math.ceil(nextWorkingHour.getMinutes() / interval) * interval
    );

    const lastWorkingHour = new Date(nextHour);
    lastWorkingHour.setHours(endHour, 0, 0, 0);

    while (nextWorkingHour < lastWorkingHour) {
      const start = nextWorkingHour.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      nextWorkingHour.setMinutes(nextWorkingHour.getMinutes() + interval);

      const end = nextWorkingHour.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      workingHours.push(`${start} - ${end}`);
    }

    return workingHours;
  }

  async getUserInfo() {
    const name = localStorage.getItem('name');

    this.user = (
      await this.userService.getUserByName(
        name,
        () => {},
        () => {}
      )
    ).user;
  }

  onRadioChange(event: any) {
    this.paymentOption = event.target.value;
  }
}
