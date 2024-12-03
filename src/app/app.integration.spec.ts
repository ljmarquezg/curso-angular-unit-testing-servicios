import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterLinkWithHref, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { asyncData, clickElement, getText, mockObservable, query, queryAllByDirective, queryById } from '../testing';
import { generateManyProducts } from './models/product.mock';
import { generateOneUser } from './models/user.mock';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/product.service'; // Utility functions for testing

describe('App Integration Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(fakeAsync(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        PicoPreviewComponent,
        PeopleComponent,
        OthersComponent,
      ],
      providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: ProductsService,
          useValue: productsServiceSpy
        },
        {
          provide: AuthService,
          useValue: authServiceSpy
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router.initialNavigation();
    tick();
    fixture.detectChanges();
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 router links', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(6);
  });

  it('should navigate to "others" route if user has session', fakeAsync(() => {
    const mockUser = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(mockUser));

    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(asyncData(productsMock))

    clickElement(fixture, 'others-link', true);
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/others'); // Assert current URL

    tick(); // Wait for data to be fetched
    fixture.detectChanges();

    const element = query(fixture, 'app-others');
    expect(element).not.toBeNull();

    expect(productsService.getAll).toHaveBeenCalled();
    const text = getText(fixture, 'total-products');
    expect(text).toBe('Total Products: 10');
  }));

  it('should navigate to "home" if user does not have a session', fakeAsync(() => {
    authService.getUser.and.returnValue(mockObservable(null));

    clickElement(fixture, 'others-link', true);
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/'); // Assert current URL

    tick(); // Wait for data to be fetched
    fixture.detectChanges();
  }));

  it('should navigate to "pico-preview" route', fakeAsync(() => {
    clickElement(fixture, 'pico-preview-link', true);
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/pico-preview'); // Assert current URL
    const element = query(fixture, 'app-pico-preview');
    expect(element).not.toBeNull();
  }));

 /* it('should navigate to "products" route', fakeAsync(() => {
    clickElement(fixture, 'products-link', true);
    const productsMock = generateManyProducts(10);
    productsService.getAll.and.returnValue(asyncData(productsMock))
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/products'); // Assert current URL

    tick(); // Wait for data to be fetched
    fixture.detectChanges();

    const element = query(fixture, 'app-products');
    expect(element).not.toBeNull();

    expect(productsService.getAll).toHaveBeenCalled();
    const text = getText(fixture, 'total-products');
    expect(text).toBe('Total Products: 10');
  }));*/
});
