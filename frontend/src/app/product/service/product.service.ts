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
      return this.http.get<Product[]>(`${environment.baseURL}/products`).pipe(take(1));
  }

  get(id: string): Observable<Product> {
      return this.http.get<Product>(`${environment.baseURL}/products/${id}`).pipe(take(1));
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.baseURL}/products`, product).pipe(take(1));
  }

  update(product: Product): Observable<Product> {
      return this.http.put<Product>(`${environment.baseURL}/products/${product.id}`, product).pipe(take(1));
  }

  delete(id: string): Observable<void> {
      return this.http.delete<void>(`${environment.baseURL}/products/${id}`).pipe(take(1));
  }
}
