import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { generateManyProducts } from '../../models/product.mock';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
        imports: [ProductsComponent],
        providers: [
          {
            provide: ProductsService,
            useValue: productsServiceSpy
          }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    const productsMock: Product[] = generateManyProducts(3);
    productsServiceSpy.getAll.and.returnValue(of(productsMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProducts', () => {
    expect(productsServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should return product list from service', () => {
    // Arrange
    const mockProducts: Product[] = generateManyProducts(3);
    productsServiceSpy.getAll.and.returnValue(of(mockProducts));
    //Act
    const countPrev = component.products().length;
    component.getAllProducts();
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const productDebugElement = debugElement.queryAll(By.css('app-product'));
    //Assert
    expect(component.products().length).toBe(mockProducts.length + countPrev);
    expect(component.products().length).toBe(productDebugElement.length);
  });

});
