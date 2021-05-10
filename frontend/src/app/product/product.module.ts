import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    ModalModule.forRoot()
  ]
})
export class ProductModule { }
