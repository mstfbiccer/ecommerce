import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailPage } from './product-detail-page';
import { Product, ProductType } from '../services/product';
import { CartStore } from '../services/cart.store';
import { CommonModule } from '@angular/common';

describe('ProductDetailPage', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockProductService: jasmine.SpyObj<Product>;
  let cartStore: InstanceType<typeof CartStore>;

  const mockProduct: ProductType = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: {
      rate: 4.5,
      count: 100
    }
  };

  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    });

    const productServiceSpy = jasmine.createSpyObj('Product', ['getById']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailPage, CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Product, useValue: productServiceSpy },
        CartStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailPage);
    component = fixture.componentInstance;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    mockProductService = TestBed.inject(Product) as jasmine.SpyObj<Product>;
    cartStore = TestBed.inject(CartStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product id from route params on initialization', () => {
    expect(component.id).toBe('1');
  });

  it('should load product details on ngOnInit when id exists', () => {
    mockProductService.getById.and.returnValue(of(mockProduct));
    
    component.ngOnInit();
    
    expect(mockProductService.getById).toHaveBeenCalledWith(1);
    expect(component.productDetails$).toBeTruthy();
  });

  it('should not load product details when id is null', () => {
    component.id = null;
    
    component.ngOnInit();
    
    expect(mockProductService.getById).not.toHaveBeenCalled();
  });

  it('should toggle showDetails when toggleDetails is called', () => {
    expect(component.showDetails).toBeFalse();
    
    component.toggleDetails();
    expect(component.showDetails).toBeTrue();
    
    component.toggleDetails();
    expect(component.showDetails).toBeFalse();
  });

  it('should add product to cart when addToCart is called', () => {
    spyOn(cartStore, 'addToCart');
    
    component.addToCart(mockProduct);
    
    expect(cartStore.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should call loadProductDetails when id is provided', () => {
    spyOn<any>(component, 'loadProductDetails');
    mockProductService.getById.and.returnValue(of(mockProduct));
    
    component.ngOnInit();
    
    expect(component['loadProductDetails']).toHaveBeenCalled();
  });

  it('should set productDetails$ observable when loadProductDetails is called', () => {
    mockProductService.getById.and.returnValue(of(mockProduct));
    
    component['loadProductDetails']();
    
    expect(component.productDetails$).toBeTruthy();
    
    component.productDetails$?.subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
  });

  it('should handle null id parameter from route', () => {
    // Mock route'u direkt olarak değiştir
    (mockActivatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);
    
    // Yeni component instance oluştur
    const newFixture = TestBed.createComponent(ProductDetailPage);
    const newComponent = newFixture.componentInstance;
    
    expect(newComponent.id).toBeNull();
  });
});