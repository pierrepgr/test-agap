import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAccessTokenInvalid()) {
      return this.authService.getNewAccessToken()
        .pipe(
          map(() => {
            if (this.authService.isAccessTokenInvalid()) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          })
        );
    } else if (next.data.roles && !this.authService.isAuthorized(next.data.roles)) {
      this.router.navigate(['/not-authorized'])
      return false;
    }

    return true;
  }
}