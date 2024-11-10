import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  private productsService = inject(ProductsService);
  products: WritableSignal<Product[]> = signal([]);

  ngOnInit() {
    this.productsService.getAllSimple().subscribe(products => {
      this.products.set(products)
    });
  }

}
