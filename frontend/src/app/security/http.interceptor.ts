import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()
export class AgapHttpInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/oauth/token') && this.auth.isAccessTokenInvalid()) {
      return from(this.auth.getNewAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalid()) {
              // localStorage.removeItem('agp-token');
              // request = request.clone({
              //   headers: request.headers.delete('Authorization')
              // });
              // return next.handle(request);
              throw new NotAuthenticatedError();
            }
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('agp-token')}`
              },
              withCredentials: true
            });
            
            return next.handle(request);
          })
          )
        }
    return next.handle(request);
  }
}