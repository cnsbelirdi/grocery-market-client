import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from './toastr-notify.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: ToastrNotifyService,
    private userAuthService: UserAuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized: //401
            this.toastrService.message(
              'You do not have permission to do this operation!',
              'Unauthorized Operation!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopFullWidth,
              }
            );
            break;
          case HttpStatusCode.NotModified:
            this.toastrService.message(
              'Not enough stock for this product!',
              'Attention!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'There is a problem communicating with the server!',
              'Communication Error!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopFullWidth,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Invalid request is made to the server!',
              'Invalid Request!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopFullWidth,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message(
              'The page you requested was not found!',
              'Page Not Found!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopFullWidth,
              }
            );
            break;
          default:
            this.toastrService.message(
              'An unexpected error has occurred!',
              'Unexpected Error!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopFullWidth,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
