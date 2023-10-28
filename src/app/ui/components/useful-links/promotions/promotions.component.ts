import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ScrollBaseComponent } from 'src/app/base/scroll-base.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent
  extends ScrollBaseComponent
  implements AfterViewInit
{
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
  panelOpenState = false;
  promotions = [
    {
      title: 'Summer Discount!',
      content:
        'Double the fun of shopping during the summer! Enjoy the vibrant flavors of seasonal fruits and vegetables with a delightful 20% discount. Fill your cart with juicy watermelons, ripe strawberries, and fresh greens to savor the taste of summer. Stay healthy and refreshed with these amazing deals!',
      validity: '2023-06-30',
      image_description: 'Renkli ve taze meyveler ve sebzeler.',
    },
    {
      title: 'Healthy Living Campaign',
      content:
        'Your well-being matters! Embrace a healthier lifestyle with our exclusive 15% discount on a wide range of organic products. Nourish your body with wholesome options like organic fruits, vegetables, dairy, and grains. Make conscious choices for your health and enjoy the benefits of natural goodness!',
      validity: '2023-07-15',
      image_description: 'Organik meyveler ve sebzeler.',
    },
    {
      title: 'Keep Your Home Clean!',
      content:
        'Maintain a spotless home effortlessly! Explore our diverse collection of top-notch cleaning supplies and enjoy a convenient 10% discount. From powerful detergents to versatile cleaning tools, we have everything you need to keep your living space tidy and fresh. Discover a clean and inviting home environment with our fantastic offers!',
      validity: '2023-08-31',
      image_description: 'Temizlik ürünleri ve temiz bir ev.',
    },
    {
      title: 'Sweet Escape',
      content:
        'Indulge in heavenly delights and treat yourself to irresistible desserts! Dive into a world of sweetness with our delectable range of pastries, cakes, and chocolates, now available at a tempting 25% discount. Whether you have a special occasion or simply want to satisfy your sweet tooth, our delightful treats are sure to delight your taste buds!',
      validity: '2023-09-30',
      image_description: 'Lezzetli pastalar ve tatlılar.',
    },
    {
      title: 'Natural Beauty Products',
      content:
        'Unleash your natural beauty with our premium selection of skincare and cosmetic products. Enhance your radiance and embrace a more confident you with our carefully curated collection. Enjoy a generous 15% discount on all your favorite brands, including organic and cruelty-free options. Discover the power of nature and pamper yourself with the best in beauty!',
      validity: '2023-10-15',
      image_description: 'Doğal güzellik ürünleri.',
    },
  ];

  ngAfterViewInit() {
    this.scrollToElement();
  }
}
