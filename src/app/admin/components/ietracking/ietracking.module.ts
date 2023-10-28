import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IetrackingComponent } from './ietracking.component';
import { RouterModule } from '@angular/router';
import { IeListComponent } from './ie-list/ie-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { NgIconsModule } from '@ng-icons/core';
import {
  matTableViewOutline,
  matStickyNote2Outline,
  matMoreVertOutline,
  matInfoOutline,
  matCallMissedOutgoingOutline,
  matCallMissedOutline,
  matAccountBalanceWalletOutline,
} from '@ng-icons/material-icons/outline';

@NgModule({
  declarations: [IetrackingComponent, IeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: IetrackingComponent }]),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    DialogModule,
    MatInputModule,
    DeleteDirectiveModule,
    NgIconsModule.withIcons({
      matTableViewOutline,
      matStickyNote2Outline,
      matInfoOutline,
      matMoreVertOutline,
      matCallMissedOutgoingOutline,
      matCallMissedOutline,
      matAccountBalanceWalletOutline,
    }),
  ],
})
export class IetrackingModule {}
