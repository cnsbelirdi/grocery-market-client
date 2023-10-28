import { Component, Output, EventEmitter } from '@angular/core';
import * as cardValidator from 'card-validator';
import { CreditCard } from 'src/app/contracts/order/credit_card';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss'],
})
export class CardPaymentComponent {
  backface: boolean = false;
  formActive: boolean = true;
  card: CreditCard = {
    cardNumber: '',
    cardType: '',
    cardHolderName: '',
    cardCVV: '',
    expireDate: '',
    isValid: false,
  };

  @Output() setPaid = new EventEmitter();

  setNumber(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    var numericValue = value.replace(/[^0-9]/g, '');
    if (value !== numericValue) {
      value = numericValue;
      (event.target as HTMLInputElement).value = numericValue; // Sadece sayıları göster
    }
    if (value.length > 16) {
      value = value.slice(0, 16); // Girdiyi kırp
    }
    value = value.replace(/\s+/g, '').replace(/(\d)(?=(\d{4})+$)/g, '$1 ');
    this.card.cardNumber = value;
    let validation = cardValidator.number(value);
    if (validation.isValid) {
      this.card.isValid = true;
      this.card.cardType = validation.card.type;
      this.setPaid.emit({ state: true });
    } else {
      this.card.isValid = false;
      this.card.cardType = '';
      this.setPaid.emit({ state: false });
    }
    console.log(this.card);
  }
  setHolderName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.card.cardHolderName = value;
  }
  setExpireDate(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.card.expireDate = value;
  }
  setCVV(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.card.cardCVV = value;
  }
  setFormActive() {
    this.formActive = !this.formActive;
    this.backface = this.backface ? !this.backface : false;
  }
}
