import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [
    CurrencyPipe
  ]
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  status: 'inital' | 'loading' | 'success' | 'error' = 'inital';
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        const productId = params.get('id');
        if (productId) {
          this.getProductDetail(productId);
        } else {
          this.goToBack();
        }
      });
  }

  private getProductDetail(productId: string) {
    this.status = 'loading';
    this.productsService.getOne(productId)
    .subscribe({
      next: (product) => {
        this.product = product;
        this.status = 'success';
      },
      error: () => {
        this.goToBack();
        this.status = 'error';
      }
    })
  }

  goToBack() {
    this.location.back();
  }

}
