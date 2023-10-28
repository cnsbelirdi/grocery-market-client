import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ScrollBaseComponent } from 'src/app/base/scroll-base.component';
import { ContactUs } from 'src/app/contracts/contact_us';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent
  extends ScrollBaseComponent
  implements AfterViewInit
{
  constructor(
    elementRef: ElementRef,
    private publicService: PublicService,
    private toastrService: ToastrNotifyService
  ) {
    super(elementRef);
  }

  ngAfterViewInit() {
    this.scrollToElement();
  }

  async send(
    type: HTMLSelectElement,
    nameSurname: HTMLInputElement,
    phoneNumber: HTMLInputElement,
    message: HTMLTextAreaElement
  ) {
    if (
      type.value != null &&
      nameSurname.value != null &&
      phoneNumber.value != null &&
      message.value != null
    ) {
      let model = new ContactUs();
      model.type = type.value;
      model.nameSurname = nameSurname.value;
      model.phoneNumber = phoneNumber.value;
      model.message = message.value;
      await this.publicService.contactUsMailSend(model, () => {
        this.toastrService.message(
          'Request is sended successfully to company',
          'Success!',
          {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          }
        );
      });
    } else {
      this.toastrService.message(
        'Please do not leave empty any fields.',
        'Warning!',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    }
  }
}
