import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../product.model';

import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  
  modalRef: BsModalRef;
  id = '';

  constructor(
      private title: Title,
      private toastr: ToastrService,
      private modalService: BsModalService,
      private productService: ProductService
  ) { }

  ngOnInit(): void {
      this.title.setTitle('Product Listing');
      this.getAllProducts()
  }

  confirmDelete(id: string, template: TemplateRef<any>) {
    this.id = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  delete() {
      this.productService.delete(this.id)
        .subscribe(() => {
            this.modalRef.hide();
            this.id = '';
            this.getAllProducts();
            this.toastr.success('', 'Product successfully deleted', { timeOut: 3000, closeButton: true });
        });
  }

  private getAllProducts() {
      this.productService.getAll()
        .subscribe(products => this.products = products);
  }
}
