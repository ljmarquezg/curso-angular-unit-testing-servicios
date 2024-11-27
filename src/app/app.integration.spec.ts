import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterLinkWithHref, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { clickElement, query, queryAllByDirective } from '../testing';
import { ProductsService } from './services/product.service'; // Utility functions for testing

describe('App Integration Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(fakeAsync(() => {
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
          useValue: jasmine.createSpyObj('ProductsService', ['getAll'])
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
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

  it('should navigate to "others" route', fakeAsync(() => {
    clickElement(fixture, 'others-link', true);
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/others'); // Assert current URL
    const element = query(fixture, 'app-others');
    expect(element).not.toBeNull();
  }));

  it('should navigate to "pico-preview" route', fakeAsync(() => {
    clickElement(fixture, 'pico-preview-link', true);
    tick(); // Wait for navigation to complete
    fixture.detectChanges();
    expect(router.url).toEqual('/pico-preview'); // Assert current URL
    const element = query(fixture, 'app-pico-preview');
    expect(element).not.toBeNull();
  }));
});
