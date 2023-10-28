import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent as UI } from './ui/layout/layout.component';
import { LayoutComponent as Admin } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { UserComponent } from './ui/components/user/user.component';
import { InvalidURLComponent } from './base/invalid-url/invalid-url.component';
import { HelpcenterComponent } from './ui/components/helpcenter/helpcenter.component';

const routes: Routes = [
  {
    path: '',
    component: UI,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/components/home/home.module').then(
            (module) => module.HomeModule
          ),
      },
      {
        path: 'category/:name',
        loadChildren: () =>
          import('./ui/components/category/category.module').then(
            (module) => module.CategoryModule
          ),
      },
      {
        path: 'category/:pageNo',
        loadChildren: () =>
          import('./ui/components/category/category.module').then(
            (module) => module.CategoryModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./ui/components/product/product.module').then(
            (module) => module.ProductModule
          ),
      },
      {
        path: 'complete-order',
        loadChildren: () =>
          import('./ui/components/order/order.module').then(
            (module) => module.OrderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('./ui/components/user/profile/profile.module').then(
                (module) => module.ProfileModule
              ),
            canActivate: [AuthGuard],
          },
          {
            path: 'orders',
            loadChildren: () =>
              import('./ui/components/user/orders/orders.module').then(
                (module) => module.OrdersModule
              ),
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./ui/components/useful-links/about-us/about-us.module').then(
            (module) => module.AboutUsModule
          ),
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import(
            './ui/components/useful-links/contact-us/contact-us.module'
          ).then((module) => module.ContactUsModule),
      },
      {
        path: 'hotdeals',
        loadChildren: () =>
          import('./ui/components/useful-links/hotdeals/hotdeals.module').then(
            (module) => module.HotdealsModule
          ),
      },
      {
        path: 'new-products',
        loadChildren: () =>
          import(
            './ui/components/useful-links/new-products/new-products.module'
          ).then((module) => module.NewProductsModule),
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import(
            './ui/components/useful-links/promotions/promotions.module'
          ).then((module) => module.PromotionsModule),
      },
      {
        path: 'helpcenter',
        component: HelpcenterComponent,
        children: [
          {
            path: '',
            redirectTo: 'payments',
            pathMatch: 'full',
          },
          {
            path: 'payments',
            loadChildren: () =>
              import(
                './ui/components/helpcenter/payments/payments.module'
              ).then((module) => module.PaymentsModule),
          },
          {
            path: 'refund',
            loadChildren: () =>
              import('./ui/components/helpcenter/refund/refund.module').then(
                (module) => module.RefundModule
              ),
          },
          {
            path: 'checkout',
            loadChildren: () =>
              import(
                './ui/components/helpcenter/checkout/checkout.module'
              ).then((module) => module.CheckoutModule),
          },
          {
            path: 'shipping',
            loadChildren: () =>
              import(
                './ui/components/helpcenter/shipping/shipping.module'
              ).then((module) => module.ShippingModule),
          },
          {
            path: 'qa',
            loadChildren: () =>
              import('./ui/components/helpcenter/qa/qa.module').then(
                (module) => module.QaModule
              ),
          },
          {
            path: 'privacy-policy',
            loadChildren: () =>
              import(
                './ui/components/helpcenter/privacy-policy/privacy-policy.module'
              ).then((module) => module.PrivacyPolicyModule),
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./admin/components/dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'marketplace',
        loadChildren: () =>
          import('./admin/components/marketplace/marketplace.module').then(
            (module) => module.MarketplaceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./admin/components/category/category.module').then(
            (module) => module.CategoryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'hotdeals',
        loadChildren: () =>
          import('./admin/components/hotdeals/hotdeals.module').then(
            (module) => module.HotdealsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('./admin/components/promotions/promotions.module').then(
            (module) => module.PromotionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'complaints',
        loadChildren: () =>
          import('./admin/components/complaints/complaints.module').then(
            (module) => module.ComplaintsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('./admin/components/bills/bills.module').then(
            (module) => module.BillsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'ietracking',
        loadChildren: () =>
          import('./admin/components/ietracking/ietracking.module').then(
            (module) => module.IetrackingModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'authorize-menu',
        loadChildren: () =>
          import('./admin/components/authorization/authorization.module').then(
            (module) => module.AuthorizationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./admin/components/roles/roles.module').then(
            (module) => module.RolesModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./ui/components/forget-password/forget-password.module').then(
        (module) => module.ForgetPasswordModule
      ),
  },
  {
    path: 'reset-password/:userId/:resetToken',
    loadChildren: () =>
      import('./ui/components/reset-password/reset-password.module').then(
        (module) => module.ResetPasswordModule
      ),
  },
  { path: '**', component: InvalidURLComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
