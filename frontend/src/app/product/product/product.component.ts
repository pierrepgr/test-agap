import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map, switchMap } from 'rxjs/operators';

import { Product } from '../product.model';

import { ProductService } from '../service/product.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  form: FormGroup;

  titlePage = 'Product Registration';

  constructor(
      private title: Title,
      private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private _formBuilder: FormBuilder,
      private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.createForm();
    
    if (this.route.snapshot.params['id']) {
        this.loadProduct();
        this.titlePage = 'Product Updating';
        this.title.setTitle('Product Updating');
    } else {
        this.titlePage = 'Product Registration';
        this.title.setTitle('Product Registration');
    }
  }

  submit() {
    if (this.form.valid) {
        const product: Product = this.form.getRawValue();
        
        if (product.id) {
            this.productService.update(product)
                .subscribe(() => {
                    this.toastr.success('', 'Product successfully updated', { timeOut: 3000, closeButton: true });
                    this.router.navigate([`products`]);
                }, (response: any) => {
                    response?.error?.errors.forEach(error => {
                        this.toastr.error('', error.message, { timeOut: 3000, closeButton: true });
                    });
                });
        } else {
            this.productService.save(product)
                .subscribe(() => {
                    this.toastr.success('', 'Product successfully created', { timeOut: 3000, closeButton: true });
                    this.router.navigate([`products`]);
                }, (response: any) => {
                    response?.error?.errors.forEach(error => {
                        this.toastr.error('', error.message, { timeOut: 3000, closeButton: true });
                    });
                });
        }
    }
  }

  private loadProduct() {
    this.route.params
        .pipe(
            map((params: any) => params['id']),
            switchMap(id => this.productService.get(id))
        ).subscribe(product => {
            this.form.patchValue(product);
        });
  }

  private createForm() {
    this.form = this._formBuilder.group({
        id: [''],
        sku: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
        name: ['', [Validators.required, Validators.maxLength(200)]],
        price: ['', [Validators.required, Validators.min(0)]]
    })
  }
}
