import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockObservable } from '../../../testing';
import { generateManyProducts } from '../../models/product.mock';
import { ProductsService } from '../../services/product.service';

import { OthersComponent } from './others.component';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  const mockProducts = generateManyProducts(3);
  
  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
        imports: [OthersComponent],
        providers: [
          {
            provide: ProductsService,
            useValue: productsServiceSpy
          }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    component = fixture.componentInstance;
    productsService.getAll.and.returnValue(mockObservable(mockProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products on init', () => {
    expect(productsService.getAll).toHaveBeenCalled();
    expect(component.products.length).toEqual(3);
    expect(component.products).toEqual(mockProducts);
  });
});
