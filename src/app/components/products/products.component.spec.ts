import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of, throwError } from 'rxjs';
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

  describe('loading status', () => {
    it('should show success status', fakeAsync(() => {
        // Arrange
        const productsMock = generateManyProducts(3);
        productsServiceSpy.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
        //Act
        component.getAllProducts();
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        tick(4000); // exec, obs, setTimeout, setInterval, setInterval, Promise
        fixture.detectChanges();
        //Assert
        expect(component.status).toBe('success');
      })
    );

    it('should show error status', fakeAsync(() => {
        // Arrange
        productsServiceSpy.getAll.and.returnValue(defer(() => Promise.reject(new Error('Error'))));
        //Act
        component.getAllProducts();
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        tick(3500); // exec, obs, setTimeout, setInterval, setInterval, Promise
        fixture.detectChanges();
        //Assert
        expect(component.status).toBe('error');
        expect(component.products().length).toBe(0);
      })
    );
  });
});
