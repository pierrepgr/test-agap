import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { AuthGuard } from './auth.guard';
import { SecurityRoutingModule } from './security-routing.module';

import { AgapHttpInterceptor } from './http.interceptor';
import { LoginComponent } from './login/login.component'
import { LoggedGuard } from './logged.guard';
import { LogoutService } from './logout.service';

import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
    return localStorage.getItem('agp-token');
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: environment.tokenWhitelistedDomains,
          disallowedRoutes: environment.tokenBlacklistedRoutes
        }
      })
  ],
  providers: [
      AuthGuard,
      LoggedGuard,
      LogoutService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AgapHttpInterceptor,
        multi: true
      }
  ]
})
export class SecurityModule { }
