import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

import { NgIconsModule } from '@ng-icons/core';
import { jamGoogle, jamFacebook } from '@ng-icons/jam-icons';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    NgIconsModule.withIcons({ jamGoogle, jamFacebook }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
