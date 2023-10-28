import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParams: Partial<RequestParams>): string {
    return `${requestParams.baseUrl ? requestParams.baseUrl : this.baseUrl}/${
      requestParams.controller
    }${requestParams.action ? `/${requestParams.action}` : ''}`;
  }

  get<T>(requestParams: Partial<RequestParams>, id?: string): Observable<T> {
    let url: string = '';
    if (requestParams.fullEndpoint) url = requestParams.fullEndpoint;
    else
      url = `${this.url(requestParams)}${id ? `/${id}` : ''}${
        requestParams.queryString ? `?${requestParams.queryString}` : ''
      }`;

    return this.httpClient.get<T>(url, { headers: requestParams.headers });
  }

  post<T>(
    requestParams: Partial<RequestParams>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParams.fullEndpoint) url = requestParams.fullEndpoint;
    else
      url = `${this.url(requestParams)}${
        requestParams.queryString ? `?${requestParams.queryString}` : ''
      }`;

    return this.httpClient.post<T>(url, body, {
      headers: requestParams.headers,
    });
  }

  put<T>(
    requestParams: Partial<RequestParams>,
    body: Partial<T>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    debugger;
    if (requestParams.fullEndpoint) url = requestParams.fullEndpoint;
    else
      url = `${this.url(requestParams)}${id ? `/${id}` : ''}${
        requestParams.queryString ? `?${requestParams.queryString}` : ''
      }`;

    return this.httpClient.put<T>(url, body, {
      headers: requestParams.headers,
    });
  }

  delete<T>(requestParams: Partial<RequestParams>, id: string): Observable<T> {
    let url: string = '';

    if (requestParams.fullEndpoint) url = requestParams.fullEndpoint;
    else
      url = `${this.url(requestParams)}/${id}${
        requestParams.queryString ? `?${requestParams.queryString}` : ''
      }`;

    return this.httpClient.delete<T>(url, { headers: requestParams.headers });
  }
}

export class RequestParams {
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
