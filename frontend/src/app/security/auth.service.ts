import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../environments/environment';
import { catchError, take, tap } from 'rxjs/operators';

export interface UserLogin {
    username: string,
    password: string
}

@Injectable()
export class AuthService {

  jwtPayload: any;

  constructor(
      private http: HttpClient,
      private jwtHelper: JwtHelperService
  ) { this.uploadToken() }

  login(userLogin: UserLogin) {
    const body = `username=${userLogin.username}&password=${userLogin.password}&grant_type=password`;

    return this.http.post<void>(`${environment.baseURL}/oauth/token`, body, { headers: this.headers, withCredentials: true })
      .pipe(
        tap((response: any) => this.storeToken(response.access_token)),
        catchError((response: any) => {
          if (response.status === 400) {
            if (response.error.error === 'invalid_grant') {
              return throwError(response.error.error_description)
            }
          }

          return throwError(response);
        }),
        take(1)
      );
  }

  getNewAccessToken(): Observable<void> {
    const body = `grant_type=refresh_token`;
    return this.http.post<void>(`${environment.baseURL}/oauth/token`, body, { headers: this.headers, withCredentials: true })
    .pipe(
      tap((response: any) => {
          this.storeToken(response.access_token)
          return of(null);
        }),
        catchError((response: any) => {
          return of(response);
        }), 
        take(1)
      );
  }

  wipeAccessToken() {
    localStorage.removeItem('agp-token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('agp-token');
    
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  isAuthorized(roles: string[]) {
    for (const role of roles)
        if (this.isPermission(role)) return true;
    return false;
  }

  isPermission(role: string) {
    return this.jwtPayload && this.jwtPayload.authorities?.includes(role);
  }

  get headers(): HttpHeaders {
      return new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', `Basic ${btoa('agap2it-web:@g@p21t')}`)
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('agp-token', token);
  }

  private uploadToken() {
    const token = localStorage.getItem('ep-token');

    if (token) {
      this.storeToken(token);
    }
  }
}
