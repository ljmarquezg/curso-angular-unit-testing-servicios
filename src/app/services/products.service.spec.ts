import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock } from 'node:test';
import { environment } from '../../environments/environment';
import { generateManyProducts } from '../models/product.mock';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

import { ValueService } from './value.service';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClientTesting()
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockProducts: Product[] = generateManyProducts(3);
      //Act
      productService.getAllSimple().subscribe(products => {
        //Assert
        expect(products).toBe(mockProducts);
        expect(products.length).toBe(mockProducts.length);
        doneFn();
      });

      const url = environment.API_URL + '/api/v1/products';
      const req = httpController.expectOne(url);
      req.flush(mockProducts);
      httpController.verify();
    });
  });
});
