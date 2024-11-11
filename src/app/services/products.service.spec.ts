import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { ProductsService } from './products.service';

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

  afterEach(() => {
    httpController.verify();
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

  describe('getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * 0.19 = 19,
          taxes: 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * 0.19 = 38
          taxes: 38
        }
      ]
      //Act
      productService.getAll().subscribe(products => {
        //Assert
        expect(products).toEqual(mockProducts);
        expect(products.length).toEqual(mockProducts.length);
        doneFn();
      });

      const url = environment.API_URL + '/api/v1/products';
      const req = httpController.expectOne(url);
      req.flush(mockProducts);
    });

    it('should return a product list with taxes', (doneFn) => {
      //Arrange
      const mockProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 // 100 * 0.19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200 // 200 * 0.19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 200 * 0.19 = 38
        },
        {
          ...generateOneProduct(),
          price: -100, // 100 * 0.19 = -19
        }
      ]
      //Act
      productService.getAll().subscribe(products => {
        //Assert
        expect(products.length).toEqual(mockProducts.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
        doneFn();
      });

      const url = environment.API_URL + '/api/v1/products';
      const req = httpController.expectOne(url);
      req.flush(mockProducts);
    });

    it('should generate a request with limit=10 and offset = 3', (doneFn) => {
      //Arrange
      const mockProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * 0.19 = 19,
          taxes: 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * 0.19 = 38
          taxes: 38
        }
      ];
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset).subscribe(products => {
        //Assert
        expect(products).toEqual(mockProducts);
        expect(products.length).toEqual(mockProducts.length);
        doneFn();
      });

      const url = environment.API_URL + `/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockProducts);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
    });
  });

  describe('create', () => {
    it('should create a product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        description: 'new product description',
        images: ['img'],
        price: 100,
        categoryId: 12
      }

      productService.create(dto).subscribe((product: Product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      const url = environment.API_URL + '/api/v1/products';
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    });
  });

  describe('update', () => {
    it('should update a product', (doneFn) => {
      const mockProduct = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'update Product',
        description: 'update product description',
        price: 200
      }

      productService.update(mockProduct.id, {...dto}).subscribe((product: Product) => {
        expect(product).toEqual(mockProduct);
        doneFn();
      })

      const url = environment.API_URL + `/api/v1/products/${mockProduct.id}`;
      const req = httpController.expectOne(url);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockProduct)
    });
  });

  describe('delete', () => {
    it('should delete a product', (doneFn) => {
      const mockData = true;
      const id = '100';
      productService.delete(id).subscribe(deleted => {
        expect(deleted).toBeTrue();
        doneFn();
      });
      const url = environment.API_URL + `/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toBeNull();
      req.flush(mockData);
    });
  });
});
