import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { SignalRService } from 'src/app/services/common/signalr.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  constructor(
    private signalRService: SignalRService,
    private toastrService: ToastrNotifyService
  ) {}

  active: boolean = true;

  setActive() {
    this.active = !this.active;
  }

  ngAfterViewInit(): void {
    this.signalRService.on(
      HubUrls.OrderHub,
      ReceiveFunctions.OrderAddedMessageReceiveFunction,
      (message) => {
        this.playNotificationSound();
        this.toastrService.message('A new order has arrived.', 'New Order!', {
          position: ToastrPosition.TopCenter,
          messageType: ToastrMessageType.Info,
        });
      }
    );
  }
  playNotificationSound(): void {
    $('#notificationSound')[0].play();
  }
}
