import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  helpCenter = [
    {
      title: 'Payments',
      href: '/helpcenter/payments',
    },
    {
      title: 'Refund',
      href: '/helpcenter/refund',
    },
    {
      title: 'Checkout',
      href: '/helpcenter/checkout',
    },
    {
      title: 'Shipping',
      href: '/helpcenter/shipping',
    },
    {
      title: 'Q&A',
      href: '/helpcenter/qa',
    },
    {
      title: 'Privacy Policy',
      href: '/helpcenter/privacy-policy',
    },
  ];

  usefulLinks = [
    {
      title: 'About Us',
      href: 'about-us',
    },
    {
      title: 'Contact Us',
      href: 'contact-us',
    },
    {
      title: 'Hot Deals',
      href: 'hotdeals',
    },
    {
      title: 'Promotions',
      href: 'promotions',
    },
    {
      title: 'New Products',
      href: 'new-products',
    },
  ];
}
