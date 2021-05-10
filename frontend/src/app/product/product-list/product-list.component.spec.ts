import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductListComponent } from './product-list.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ProductService } from '../service/product.service';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Product } from '../product.model';

describe('ProductListComponent', () => {

    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let el: HTMLElement;
    let getAllSpy: any;
    const expectedProducts: Product[] =[
        { id: 1, name: 'Jacket', sku: 'AAAA12345', price: 10, creationDateTime: new Date() },
        { id: 2, name: 'Shoes', sku: 'AABB12345', price: 70, creationDateTime: new Date() },
    ];

    beforeEach(async () => {
        const productService = jasmine.createSpyObj('ProductService', ['getAll'])

        getAllSpy = productService.getAll.and.returnValue(of(expectedProducts));

        TestBed.configureTestingModule({
            declarations: [
                ProductListComponent
            ],
            imports: [
                ModalModule.forRoot()
            ],
            providers: [
                { provide: ProductService, useValue: productService },
                BsModalService
            ]
        });

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        el = fixture.nativeElement;
    });

    it(`should show products after component initialized`, async () => {
        fixture.detectChanges();
        expect(el.querySelector('#products').textContent).toContain(expectedProducts[0].name)
        expect(getAllSpy.calls.any()).toBe(true, 'getQuote called');
    });

    it(`should render Product Listing text in tag h2`, async () => {
        fixture.detectChanges();
        expect(el.querySelector('h2').innerText).toContain('Product Listing');
    });

    it(`should have one link with id newProduct`, async () => {
        expect(fixture.debugElement.queryAll(By.css('#newProduct')).length).toEqual(1);
    });
});
