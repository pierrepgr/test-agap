import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Product } from '../product.model';

@Injectable()
export class ProductService {

  constructor(
      private http: HttpClient
  ) { }

  getAll(): Observable<Product[]> {
      return this.http.get<Product[]>(`${environment.baseURL}/products`, { headers: this.headers }).pipe(take(1));
  }

  get(id: string): Observable<Product> {
      return this.http.get<Product>(`${environment.baseURL}/products/${id}`, { headers: this.headers }).pipe(take(1));
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.baseURL}/products`, product, { headers: this.headers }).pipe(take(1));
  }

  update(product: Product): Observable<Product> {
      return this.http.put<Product>(`${environment.baseURL}/products/${product.id}`, product, { headers: this.headers }).pipe(take(1));
  }

  delete(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.baseURL}/products/${id}`, { headers: this.headers }).pipe(take(1));
  }

  get headers(): HttpHeaders {
    return new HttpHeaders()
        .append('Authorization', `Basic ${btoa('admin:admin')}`)
  }
}
