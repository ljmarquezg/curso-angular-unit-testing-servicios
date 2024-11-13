import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ValueService } from '../../services/value.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private valueService: ValueService = inject(ValueService);

  products: WritableSignal<Product[]> = signal([]);
  limit: number = 10;
  offset: number = 0;
  status: 'init' | 'loading' | 'error' | 'success' = 'init';
  rta: string = '';

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe({
      next: products => {
        this.products.set([...this.products(), ...products]);
        this.offset += this.limit;
        this.status = 'success';
      },
      error: error => {
        setTimeout(() => {
          this.products.set([]);
          this.status = 'error';
        }, 3000);
      }
    });
  }

  callPromise(): void {
    this.valueService.getPromiseValue().then((value: string) => {
      this.rta = value;
    })
  }

}
