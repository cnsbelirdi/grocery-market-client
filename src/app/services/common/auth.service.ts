import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/entities/user';
import { PublicService } from './public.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  async identityCheck() {
    const token: string = localStorage.getItem('accessToken');

    let expired: boolean;
    let role: string;

    try {
      expired = this.jwtHelper.isTokenExpired(token);
      role =
        this.jwtHelper.decodeToken(token)[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      let username = this.jwtHelper.decodeToken(token);
    } catch (error) {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
    _isAdmin = token != null && role == 'AdminRole';
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  get isAdmin(): boolean {
    return _isAdmin;
  }
}

export let _isAuthenticated: boolean;
export let _isAdmin: boolean;
