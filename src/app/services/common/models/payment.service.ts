import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { SinglePayment } from 'src/app/contracts/payment/single_payment';
import { Observable, firstValueFrom } from 'rxjs';
import { CreatePayment } from 'src/app/contracts/payment/create_payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClientService: HttpClientService) {}

  async read(
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ payments: SinglePayment[] }> {
    let page = -1;
    let size = -1;
    const observable: Observable<{ payments: SinglePayment[] }> =
      this.httpClientService.get<{ payments: SinglePayment[] }>({
        controller: 'payments',
        queryString: `page=${page}&size=${size}`,
      });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async getPaymentById(
    id: string,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ payment: SinglePayment }> {
    const observable: Observable<{ payment: SinglePayment }> =
      this.httpClientService.get<{ payment: SinglePayment }>(
        {
          controller: 'payments',
        },
        id
      );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async create(
    payment: CreatePayment,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'payments',
      },
      payment
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async update(
    payment: SinglePayment,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put(
      {
        controller: 'payments',
      },
      payment
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }

  async delete(
    id: string,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete(
      {
        controller: 'payments',
      },
      id
    );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallback(error));

    return await promiseData;
  }
}
