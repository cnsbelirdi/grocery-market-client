import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../http-client.service';
import {
  ToastrNotifyService,
  ToastrMessageType,
  ToastrPosition,
} from '../toastr-notify.service';
import { List_User } from 'src/app/contracts/users/list_user';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrNotifyService
  ) {}

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'auth',
          action: 'login',
        },
        { userNameOrEmail, password }
      );

    const tokenResponse: TokenResponse = await firstValueFrom(observable);
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      localStorage.setItem('name', userNameOrEmail);
      this.toastrService.message(
        'User login successfully made!',
        'Login Successful!',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunction();
  }

  async googleLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'auth',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      localStorage.setItem('name', user.email);
      this.toastrService.message(
        'Google login successfully made!',
        'Login Successful!',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunction();
  }

  async facebookLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'facebook-login',
          controller: 'auth',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      localStorage.setItem('name', user.email);
      this.toastrService.message(
        'Facebook login successfully made!',
        'Login Successful!',
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    }
    callBackFunction();
  }

  async refreshTokenLogin(
    refreshToken: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post(
        {
          action: 'refreshTokenlogin',
          controller: 'auth',
        },
        { refreshToken: refreshToken }
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }

  async passwordReset(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'password-reset',
      },
      { email: email }
    );

    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(
    resetToken: string,
    userId: string,
    callBackFunction?: () => void
  ): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'verify-reset-token',
      },
      { resetToken: resetToken, userId: userId }
    );
    const state: boolean = await firstValueFrom(observable);
    callBackFunction();
    return state;
  }
}
