import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerName: SpinnerType) {
    this.spinner.show(spinnerName);
    setTimeout(() => this.hideSpinner(spinnerName), 1000);
  }

  hideSpinner(spinnerName: SpinnerType) {
    this.spinner.hide(spinnerName);
  }
}

export enum SpinnerType {
  BallAtom = 's1',
}
