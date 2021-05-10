import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../product.model';

describe('ProductService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
 
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should fetch products as an Observable', () => {
        const testUrl = 'http://localhost:8080/products';
        const expectedProducts: Product[] =[
            { id: 1, name: 'Jacket', sku: 'AAAA12345', price: 10, creationDateTime: new Date() },
            { id: 2, name: 'Shoes', sku: 'AABB12345', price: 70, creationDateTime: new Date() },
        ];
      
        httpClient.get<Product[]>(testUrl)
          .subscribe(products =>
            expect(products.length).toBe(2)
          );
      
        const req = httpTestingController.expectOne(testUrl);
      
        expect(req.request.method).toEqual('GET');
      
        req.flush(expectedProducts);
      
        httpTestingController.verify();
    });

    it('should make post request as an Observable', () => {
        const testUrl = 'http://localhost:8080/products';
        const expextedProduct: Product = { name: 'Jacket', sku: 'AAAA12345', price: 10, creationDateTime: new Date() };
      
        httpClient.post<Product>(testUrl, expextedProduct)
          .subscribe(product =>
            expect(product.id).toBe(1)
          );
      
        const req = httpTestingController.expectOne(testUrl);
        
        expect(req.request.method).toEqual('POST');
        
        expextedProduct.id = 1;
        req.flush(expextedProduct);
      
        httpTestingController.verify();
    });

    it('should make put request as an Observable', () => {
        const testUrl = 'http://localhost:8080/products/1';
        const product: Product = { id: 1, name: 'Blue Jacker', sku: 'AAAA12345', price: 10, creationDateTime: new Date() };
      
        httpClient.put<Product>(testUrl, product)
          .subscribe(product =>
            expect(product.name).not.toEqual('Blue Jacket')
          );
      
        const req = httpTestingController.expectOne(testUrl);
        
        expect(req.request.method).toEqual('PUT');
        
        product.name = 'Jacket';
        req.flush(product);
      
        httpTestingController.verify();
    });

    it('should make delete request as an Observable', () => {
        const testUrl = 'http://localhost:8080/products/1';

        httpClient.delete<Product>(testUrl)
          .subscribe(product =>
            expect(product).toBeNull()
          );
      
        const req = httpTestingController.expectOne(testUrl);
        
        expect(req.request.method).toEqual('DELETE');
        
        req.flush(null);
      
        httpTestingController.verify();
    });

    it('should make get request as an Observable', () => {
        const testUrl = 'http://localhost:8080/products/1';
        const expextedProduct: Product = { id: 1, name: 'Blue Jacker', sku: 'AAAA12345', price: 10, creationDateTime: new Date() };

        httpClient.get<Product>(testUrl)
          .subscribe(product =>
            expect(product).toEqual(expextedProduct)
          );
      
        const req = httpTestingController.expectOne(testUrl);
        
        expect(req.request.method).toEqual('GET');
        
        req.flush(expextedProduct);
      
        httpTestingController.verify();
    });
});
