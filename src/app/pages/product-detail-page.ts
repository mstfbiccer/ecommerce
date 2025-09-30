import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductType } from '../services/product';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: 'product-detail-page.html',
  styleUrls: ['product-detail-page.scss']
})
export class ProductDetailPage {
  id: string | null;
  showDetails = false;
  productDetails$: Observable<ProductType | undefined> | null = null;

  constructor(private route: ActivatedRoute, private productService: Product) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    if (this.showDetails && !this.productDetails$) {
      this.loadProductDetails();
    }
  }

  private loadProductDetails() {
    if (this.id) {
      this.productDetails$ = new Observable(observer => {
        this.productService.getById(parseInt(this.id!)).then(product => {
          observer.next(product);
          observer.complete();
        }).catch(error => {
          observer.error(error);
        });
      });
    } else {
      this.productDetails$ = of(undefined);
    }
  }
}