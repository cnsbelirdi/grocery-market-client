import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ProfileModule } from './profile/profile.module';
import { OrderModule } from '../order/order.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, ProfileModule, OrderModule, RouterModule],
  exports: [UserComponent],
})
export class UserModule {}
