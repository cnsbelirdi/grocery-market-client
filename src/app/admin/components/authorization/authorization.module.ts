import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthorizationComponent }]),
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AuthorizationModule {}
