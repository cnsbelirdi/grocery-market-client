import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AboutUsModule } from './useful-links/about-us/about-us.module';
import { ContactUsModule } from './useful-links/contact-us/contact-us.module';
import { HotdealsModule } from './useful-links/hotdeals/hotdeals.module';
import { NewProductsModule } from './useful-links/new-products/new-products.module';
import { PromotionsModule } from './useful-links/promotions/promotions.module';
import { HelpcenterModule } from './helpcenter/helpcenter.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    ForgetPasswordModule,
    ResetPasswordModule,
    CategoryModule,
    ProductModule,
    UserModule,
    AboutUsModule,
    ContactUsModule,
    HotdealsModule,
    NewProductsModule,
    PromotionsModule,
    HelpcenterModule,
  ],
})
export class ComponentsModule {}
