import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let comp: LoginComponent;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                FormsModule,
                BrowserModule,
                HttpClientModule,
                ReactiveFormsModule,
                JwtModule.forRoot({}),
                RouterModule.forRoot([]),
            ],
            providers: [
                AuthService,
                JwtHelperService
            ]
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(LoginComponent);
            comp = fixture.componentInstance;
            comp.ngOnInit();
        });
    });

    it(`should render Login text in tag h3`, async () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('h3');
        expect(el.innerText).toContain('Login')
    });

    it(`should call the signIn method`, async () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        spyOn(comp, 'signIn');
        const el = fixture.debugElement.query(By.css('button')).nativeElement;
        el.click();
        expect(comp.signIn).toHaveBeenCalledTimes(0);
    });

    it(`form should be invalid`, async () => {
        comp.form.controls.username.setValue('');
        comp.form.controls.password.setValue('');
        expect(comp.form.valid).toBeFalsy();
    });

    it(`form should be valid`, async () => {
        comp.form.controls.username.setValue('admin@admin.com');
        comp.form.controls.password.setValue('12345');
        expect(comp.form.valid).toBeTruthy();
    });
});
