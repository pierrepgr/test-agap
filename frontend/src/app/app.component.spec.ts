import { RouterModule, Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { CoreModule } from './core/core.module';
import { LogoutService } from './security/logout.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

describe('AppComponent', () => {
    const routes: Routes = [
        { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) },
        { path: 'products', loadChildren: () => import('src/app/product/product.module').then(m => m.ProductModule) },

        { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [
                CoreModule,
                JwtModule.forRoot({}),
                RouterModule.forRoot(routes)
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                LogoutService,
                JwtHelperService
            ]
        }).compileComponents();
    });

    it(`should render app-navbar and app-footer component`, async () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;    
        expect(compiled.querySelector('app-navbar')).toBeTruthy()
        expect(compiled.querySelector('app-footer')).toBeTruthy()
    })
});
