import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

import { NgIconsModule } from '@ng-icons/core';
import {
  heroFire,
  heroHome,
  heroMegaphone,
  heroPhone,
  heroShoppingCart,
  heroChevronDown,
  heroMapPin,
  heroEnvelope,
  heroClock,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import {
  matPercentOutline,
  matGridViewOutline,
} from '@ng-icons/material-icons/outline';

import {
  jamFacebook,
  jamTwitter,
  jamInstagram,
  jamLinkedin,
  jamSearch,
} from '@ng-icons/jam-icons';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';
import { BasketComponent } from './header/basket/basket.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    DynamicLoadComponentDirective,
    BasketComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    NgIconsModule.withIcons({
      heroFire,
      heroHome,
      matPercentOutline,
      heroMegaphone,
      heroPhone,
      heroTrash,
      heroShoppingCart,
      heroChevronDown,
      jamSearch,
      matGridViewOutline,
      heroMapPin,
      heroEnvelope,
      heroClock,
      jamFacebook,
      jamTwitter,
      jamInstagram,
      jamLinkedin,
    }),
  ],
  exports: [NavbarComponent, HeaderComponent, FooterComponent, BasketComponent],
})
export class ComponentsModule {}
