import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { List_User } from 'src/app/contracts/users/list_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as Create_User;
  }

  async update(user: User): Promise<Create_User> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'update-user',
      },
      user
    );

    return (await firstValueFrom(observable)) as Create_User;
  }

  async updatePassword(
    userId: string,
    resetToken: string,
    password: string,
    passwordConfirm: string,
    successCallback?: () => void,
    errorCallback?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'update-password',
      },
      {
        userId: userId,
        resetToken: resetToken,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData
      .then((value) => successCallback())
      .catch((error) => errorCallback(error));
    await promiseData;
  }

  async getAllUsers(
    page: number = 0,
    size: number = 5,
    successCalback?: () => void,
    errorCalback?: (error: string) => void
  ): Promise<{ totalUserCount: number; users: List_User[] }> {
    const observable: Observable<{
      totalUserCount: number;
      users: List_User[];
    }> = this.httpClientService.get({
      controller: 'users',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCalback())
      .catch((error) => errorCalback(error));

    return await promiseData;
  }

  async assignRoleToUser(
    id: string,
    roles: string[],
    successCallback?: () => void,
    errorCallback?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'assign-role-to-user',
      },
      {
        userId: id,
        roles: roles,
      }
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallback())
      .catch((error) => errorCallback(error));
    await promiseData;
  }

  async getRolesToUser(
    userId: string,
    successCallback?: () => void,
    errorCallback?: (error) => void
  ): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> =
      this.httpClientService.get(
        {
          controller: 'users',
          action: 'get-roles-to-user',
        },
        userId
      );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallback())
      .catch((error) => errorCallback(error));
    return (await promiseData).userRoles;
  }

  async getUserByName(
    name: string,
    successCallback?: () => void,
    errorCallback?: (error) => void
  ): Promise<{ user: User }> {
    const observable: Observable<{ user: User }> = this.httpClientService.get(
      {
        controller: 'users',
        action: 'GetUserByName',
      },
      name
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback()).catch((error) => {});

    return await promiseData;
  }
}
