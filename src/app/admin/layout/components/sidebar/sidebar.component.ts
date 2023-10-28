import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() active: boolean;
  @Output() activeEvent = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrNotifyService
  ) {}

  marketingItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: 'matDashboard',
      url: 'dashboard',
    },
    {
      name: 'Marketplace',
      icon: 'matShoppingCart',
      url: 'marketplace',
    },
    {
      name: 'Orders',
      icon: 'matShoppingBasket',
      url: 'orders',
    },
    {
      name: 'Customers',
      icon: 'matPeopleAlt',
      url: 'customers',
    },
    {
      name: 'Category',
      icon: 'matBallot',
      url: 'category',
    },
    {
      name: 'Hot Deals',
      icon: 'matLocalFireDepartment',
      url: 'hotdeals',
    },
    {
      name: 'Promotions',
      icon: 'matCampaign',
      url: 'promotions',
    },
    {
      name: 'Complaints',
      icon: 'matArticle',
      url: 'complaints',
    },
  ];
  paymentsItems: SidebarItem[] = [
    {
      name: 'Bills',
      icon: 'matMonetizationOn',
      url: 'bills',
    },
    {
      name: 'Income / Expense Tracking',
      icon: 'matMonitorHeart',
      url: 'ietracking',
    },
  ];
  adminItems: SidebarItem[] = [
    {
      name: 'Authorization',
      icon: 'matAdminPanelSettings',
      url: 'authorize-menu',
    },
    {
      name: 'Roles',
      icon: 'matManageAccounts',
      url: 'roles',
    },
  ];

  setActive() {
    this.activeEvent.emit();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message(
      'Account has been logged out!',
      'Logout Successfully!',
      {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      }
    );
  }
}

class SidebarItem {
  name: string;
  icon: string;
  url: string;
}
