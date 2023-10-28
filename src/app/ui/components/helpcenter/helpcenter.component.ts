import { Component } from '@angular/core';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.scss'],
})
export class HelpcenterComponent {
  helpcenter = [
    {
      title: 'Payments',
      url: 'payments',
    },
    {
      title: 'Refund',
      url: 'refund',
    },
    {
      title: 'Checkout',
      url: 'checkout',
    },
    {
      title: 'Shipping',
      url: 'shipping',
    },
    {
      title: 'Q&A',
      url: 'qa',
    },
    {
      title: 'Privacy & Policy',
      url: 'privacy-policy',
    },
  ];
}
