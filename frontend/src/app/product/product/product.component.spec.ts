import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductService } from '../service/product.service';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
    let comp: ProductComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ProductComponent
            ],
            imports: [
                FormsModule,
                CommonModule,
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
            providers: [
                ProductService,
                FormBuilder
            ]
        }).compileComponents().then(() => {
            const fixture = TestBed.createComponent(ProductComponent);
            comp = fixture.componentInstance;
            comp.ngOnInit();
        });
    });

    it(`should have as titlePage Listing 'Product Registration'`, async () => {
        const fixture = TestBed.createComponent(ProductComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.titlePage).toEqual('Product Registration');
    });

    it(`should render titlePage in a h2 tag`, async () => {
        const fixture = TestBed.createComponent(ProductComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Product Registration')
    });

    it(`form should be invalid`, async () => {
        comp.form.controls.id.setValue('');
        comp.form.controls.sku.setValue('');
        comp.form.controls.name.setValue('');
        comp.form.controls.price.setValue('');
        expect(comp.form.valid).toBeFalsy();
    });

    it(`form should be valid`, async () => {
        comp.form.controls.sku.setValue('AAAA1234');
        comp.form.controls.name.setValue('Jacket');
        comp.form.controls.price.setValue(10);
        expect(comp.form.valid).toBeTruthy();
    });

    it(`should call the submit method`, async () => {
        const fixture = TestBed.createComponent(ProductComponent);
        fixture.detectChanges();
        spyOn(comp, 'submit');
        const el = fixture.debugElement.query(By.css('#save')).nativeElement;
        el.click();
        expect(comp.submit).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
        const fixture = TestBed.createComponent(ProductComponent);
        fixture.destroy();
    });
});
