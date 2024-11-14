import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { asyncData, asyncError, clickEvent, getText, mockObservable, query, queryById } from '../../../testing';
import { generateManyProducts } from '../../models/product.mock';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ValueService } from '../../services/value.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
        imports: [ProductsComponent],
        providers: [
          {
            provide: ProductsService,
            useValue: productsServiceSpy
          },
          {
            provide: ValueService,
            useValue: valueServiceSpy
          }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock: Product[] = generateManyProducts(3);
    productsService.getAll.and.returnValue(mockObservable(productsMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProducts', () => {
    expect(productsService.getAll).toHaveBeenCalled();
  });

  it('should return product list from service', () => {
    // Arrange
    const mockProducts: Product[] = generateManyProducts(3);
    productsService.getAll.and.returnValue(mockObservable(mockProducts));
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
        productsService.getAll.and.returnValue(asyncData(productsMock));
        //const debugElement = fixture.debugElement;
        //const buttonDebugElement = debugElement.query(By.css('button.load-products'));
        //Act
        //component.getAllProducts();
        clickEvent(fixture, 'btn-load-products', true);
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        tick(4000); // exec, obs, setTimeout, setInterval, setInterval, Promise
        fixture.detectChanges();
        //Assert
        expect(component.status).toBe('success');
        expect(productsService.getAll).toHaveBeenCalled();
      })
    );

    it('should show error status', fakeAsync(() => {
        // Arrange
        productsService.getAll.and.returnValue(asyncError(new Error('Error')));
        // const debugElement = fixture.debugElement;
        // const buttonDebugElement = debugElement.query(By.css('button.load-products'));
        const buttonDebugElement = query(fixture, 'button.load-products');
        //Act
        //component.getAllProducts();
        //buttonDebugElement.triggerEventHandler('click', null);
        clickEvent(fixture, 'btn-load-products', true);
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        expect(buttonDebugElement.nativeElement.disabled).toBeTrue();
        tick(3500); // exec, obs, setTimeout, setInterval, setInterval, Promise
        fixture.detectChanges();
        //Assert
        expect(component.status).toBe('error');
        expect(component.products().length).toBe(0);
        expect(buttonDebugElement.nativeElement.disabled).toBeFalse();
      })
    );
  });

  describe('callPromise', () => {
    it('should get promise value using async', async () => {
      // Arrange
      const rtaMsg = 'my promise string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(rtaMsg));
      // Act
      await component.callPromise();
      fixture.detectChanges();
      // Assert
      expect(component.rta).toBe(rtaMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should get promise value using fakeAsync', fakeAsync(() => {
        // Arrange
        const rtaMsg = 'my promise string';
        valueService.getPromiseValue.and.returnValue(Promise.resolve(rtaMsg));
        // Act
        component.callPromise();
        tick();
        fixture.detectChanges();
        // Assert
        expect(component.rta).toBe(rtaMsg);
        expect(valueService.getPromiseValue).toHaveBeenCalled();
      })
    );

    it('should show "my promise string" when clicking load promise button ', fakeAsync(() => {
        // Arrange
        const rtaMsg = 'my promise string';
        valueService.getPromiseValue.and.returnValue(Promise.resolve(rtaMsg));
        const buttonDebugElement = queryById(fixture, 'btn-promise');
        buttonDebugElement.triggerEventHandler('click', null);
        // Act
        tick();
        fixture.detectChanges();
        //const promiseResponseElement = query(fixture, '.promise-response')
        const textRta = getText(fixture, 'promise-response');
        // Assert
        expect(component.rta).toBe(rtaMsg);
        expect(valueService.getPromiseValue).toHaveBeenCalled();
        expect(textRta).toEqual(rtaMsg);
      })
    );
  });
});
