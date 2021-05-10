import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { environment } from './../../environments/environment';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

  constructor(
      private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  logout(): void {
    this.http.delete<void>(`${environment.baseURL}/tokens/revoke`, { withCredentials: true })
      .pipe(
        catchError((response: any) => {
          return throwError('Error to make logout', response);
        }),
        take(1)
      ).subscribe(() => {
          this.authService.wipeAccessToken();
          this.router.navigate([`login`]);
        });
  }
}
