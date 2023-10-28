import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowSmallRight } from '@ng-icons/heroicons/outline';
import { matAddShoppingCartOutline } from '@ng-icons/material-icons/outline';
import { ExploreCategoriesComponent } from './explore-categories/explore-categories.component';
import { TopSellsProductsComponent } from './top-sells-products/top-sells-products.component';

@NgModule({
  declarations: [HomeComponent, ExploreCategoriesComponent, TopSellsProductsComponent],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    NgIconsModule.withIcons({
      heroArrowSmallRight,
      matAddShoppingCartOutline,
    }),
  ],
})
export class HomeModule {}
