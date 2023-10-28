import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  matKeyboardDoubleArrowLeft,
  matDashboard,
  matShoppingCart,
  matShoppingBasket,
  matPeopleAlt,
  matLocalFireDepartment,
  matCampaign,
  matArticle,
  matMonetizationOn,
  matMonitorHeart,
  matLogout,
  matBallot,
  matAdminPanelSettings,
  matManageAccounts,
} from '@ng-icons/material-icons/baseline';
import { jamWorld } from '@ng-icons/jam-icons';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({
      matKeyboardDoubleArrowLeft,
      matDashboard,
      matShoppingCart,
      matShoppingBasket,
      matPeopleAlt,
      matLocalFireDepartment,
      matCampaign,
      matArticle,
      matMonetizationOn,
      matMonitorHeart,
      matLogout,
      jamWorld,
      matBallot,
      matAdminPanelSettings,
      matManageAccounts,
    }),
  ],
  exports: [SidebarComponent],
})
export class ComponentsModule {}
