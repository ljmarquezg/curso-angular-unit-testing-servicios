import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Product } from '../../models/product.model';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
    FormsModule,
    ReversePipe,
  ],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent implements OnInit {
  color = 'blue';
  text = 'hello';
  products: Product[] = [];
  protected productService: ProductsService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]): void => {
        this.products = products;
      }
    });
  }
}
