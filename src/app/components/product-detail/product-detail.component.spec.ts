import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { defer, delay, of } from 'rxjs';
import { asyncData, getText, mockObservable } from '../../../testing';
import { generateOneProduct } from '../../models/product.mock';
import { ProductsService } from '../../services/product.service';
import { ProductDetailComponent } from './product-detail.component';

const productId = '1';
fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back', 'isCurrentPathEqualTo', 'go']);

    await TestBed.configureTestingModule({
        imports: [ProductDetailComponent],
        providers: [
          provideRouter([
            {
              path: 'products',
              component: ProductDetailComponent,
            },
            {
              path: 'products/:id',
              component: ProductDetailComponent,
            },
          ]),
          provideLocationMocks(),
          {
            provide: ProductsService,
            useValue: productServiceSpy
          },
          {
            provide: Location,
            useValue: locationSpy
          }
        ]
      })
      .compileComponents();
    harness = await RouterTestingHarness.create();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as unknown as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', async () => {
    component = await harness.navigateByUrl(`products/${productId}`, ProductDetailComponent);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate back if no productId is provided', async () => {
    location.back.and.callThrough();
    const productMock = {
      ...generateOneProduct(),
      id: productId
    };
    productService.getOne.and.returnValue(mockObservable(productMock));
    component = await harness.navigateByUrl(`products`, ProductDetailComponent);
    fixture.detectChanges();
    expect(productService.getOne).not.toHaveBeenCalledWith(productId);
    expect(location.back).toHaveBeenCalled();
  });

  describe('product id is provided', () => {
    const productMock = {
      ...generateOneProduct(),
      id: productId
    };

    it('should render product if productId is provided', async() => {
      productService.getOne.and.returnValue(mockObservable(productMock));
      component = await harness.navigateByUrl(`products/${productId}`, ProductDetailComponent);
      fixture.detectChanges();
      expect(getText(harness.fixture, 'title')).toContain(productMock.title);
      expect(getText(harness.fixture, 'price')).toContain(productMock.price.toString());
      expect(productService.getOne).toHaveBeenCalledWith(productId);
    });

    it('should change status when productId is provided', fakeAsync(async() => {
      productService.getOne.and.returnValue(of(productMock).pipe(delay(1000)));
      component = await harness.navigateByUrl(`products/${productId}`, ProductDetailComponent);
      expect(component.status).toBe('loading');
      fixture.detectChanges();
      tick(1000);
      expect(productService.getOne).toHaveBeenCalledWith(productId);
      fixture.detectChanges();
      expect(component.status).toBe('success');
    }));

    it('should typeCustomer be "customer"', async() => {
      productService.getOne.and.returnValue(mockObservable(productMock));
      component = await harness.navigateByUrl(`products/${productId}?type=customer`, ProductDetailComponent);
      fixture.detectChanges();
      // @ts-ignore
      const queryParams = component.route.snapshot.queryParamMap;
      expect(queryParams.has('type')).toBeTrue();
      expect(queryParams.get('type')).toBe('customer');
      expect(component.typeCustomer).toBe('customer');
    });
  });
});
