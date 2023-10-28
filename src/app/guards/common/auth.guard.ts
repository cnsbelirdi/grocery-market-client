import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  AuthService,
  _isAuthenticated,
  _isAdmin,
} from 'src/app/services/common/auth.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastrService: ToastrNotifyService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);
    this.authService.identityCheck();
    if (!_isAuthenticated) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastrService.message(
        'You have to login first!',
        'Unauthorized access',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    }
    const requiredRole = route.data.role;
    if (requiredRole) {
      if (requiredRole == 'admin' && !_isAdmin) {
        this.router.navigate(['']);
        this.toastrService.message(
          'You are not authorized to access this page!',
          'Unauthorized access',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    }
    this.spinner.hide(SpinnerType.BallAtom);

    return true;
  }
}
