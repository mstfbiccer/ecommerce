import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Product, ProductType } from '../services/product';
import { Subject, startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface FilterForm {
  search: FormControl<string>;
  category: FormControl<string>;
  brand: FormControl<string>;
  minPrice: FormControl<number | null>;
  maxPrice: FormControl<number | null>;
  inStock: FormControl<boolean>;
  sortBy: FormControl<string>;
}

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Ürünler</h1>
      
      <!-- Filter Form -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form [formGroup]="filterForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <input 
              formControlName="search" 
              type="text" 
              placeholder="Ürün ara..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select formControlName="category" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Tüm Kategoriler</option>
              <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
            </select>
          </div>

          <!-- Brand -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Marka</label>
            <select formControlName="brand" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Tüm Markalar</option>
              <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
            <select formControlName="sortBy" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="name-asc">İsim (A-Z)</option>
              <option value="name-desc">İsim (Z-A)</option>
              <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
              <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
            </select>
          </div>

          <!-- Price Range -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı</label>
            <div class="grid grid-cols-2 gap-2">
              <input 
                formControlName="minPrice" 
                type="number" 
                placeholder="Min"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <input 
                formControlName="maxPrice" 
                type="number" 
                placeholder="Max"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
          </div>

          <!-- Stock Filter -->
          <div class="flex items-center">
            <label class="flex items-center">
              <input 
                formControlName="inStock" 
                type="checkbox" 
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              <span class="ml-2 text-sm text-gray-700">Sadece stokta olanlar</span>
            </label>
          </div>

          <!-- Clear Filters -->
          <div class="flex items-end">
            <button 
              type="button"
              (click)="clearFilters()"
              class="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
              Filtreleri Temizle
            </button>
          </div>
        </form>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">{{ filteredProducts.length }} ürün bulundu</p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div *ngFor="let product of filteredProducts" 
             class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          
          <!-- Product Image -->
          <div class="relative">
            <img 
              [src]="product.image" 
              [alt]="product.name"
              class="w-full h-48 object-cover">
            <div *ngIf="!product.inStock" 
                 class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Stokta Yok
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ product.brand }}</p>
            <p class="text-gray-700 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            
            <!-- Price and Category -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-2xl font-bold text-blue-600">{{ product.price | currency:'TRY':'symbol':'1.0-0' }}</span>
              <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{{ product.category }}</span>
            </div>

            <!-- Action Button -->
            <a 
              [routerLink]="['/products', product.id]"
              class="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
              [class.opacity-50]="!product.inStock"
              [class.pointer-events-none]="!product.inStock">
              {{ product.inStock ? 'Detayları Gör' : 'Stokta Yok' }}
            </a>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div *ngIf="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  products: ProductType[] = [];
  filteredProducts: ProductType[] = [];
  categories: string[] = [];
  brands: string[] = [];

  filterForm = new FormGroup<FilterForm>({
    search: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    brand: new FormControl('', { nonNullable: true }),
    minPrice: new FormControl<number | null>(null),
    maxPrice: new FormControl<number | null>(null),
    inStock: new FormControl(false, { nonNullable: true }),
    sortBy: new FormControl('name-asc', { nonNullable: true })
  });

  constructor(
    private productService: Product,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();
    this.setupFormSubscription();
    this.loadFiltersFromUrl();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData() {
    this.products = this.productService.list();
    this.categories = this.productService.getCategories();
    this.brands = this.productService.getBrands();
    this.filteredProducts = [...this.products];
  }

  private setupFormSubscription() {
    // Tüm form değişikliklerini tek bir stream olarak dinle
    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      debounceTime(100), // Tüm değişiklikler için uniform gecikme
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
      this.updateUrl();
    });
  }

  private loadFiltersFromUrl() {
    const params = this.route.snapshot.queryParams;
    
    this.filterForm.patchValue({
      search: params['search'] || '',
      category: params['category'] || '',
      brand: params['brand'] || '',
      minPrice: params['minPrice'] ? +params['minPrice'] : null,
      maxPrice: params['maxPrice'] ? +params['maxPrice'] : null,
      inStock: params['inStock'] === 'true',
      sortBy: params['sortBy'] || 'name-asc'
    }, { emitEvent: false });

    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.products];
    const formValue = this.filterForm.value;

    // Search filter
    if (formValue.search?.trim()) {
      const searchTerm = formValue.search.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (formValue.category) {
      filtered = filtered.filter(product => product.category === formValue.category);
    }

    // Brand filter
    if (formValue.brand) {
      filtered = filtered.filter(product => product.brand === formValue.brand);
    }

    // Price range filter
    if (formValue.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= formValue.minPrice!);
    }
    if (formValue.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= formValue.maxPrice!);
    }

    // Stock filter
    if (formValue.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    const [sortField, sortDirection] = (formValue.sortBy || 'name-asc').split('-');
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name, 'tr');
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      }
      
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    this.filteredProducts = filtered;
  }

  private updateUrl() {
    const formValue = this.filterForm.value;
    const queryParams: any = {};

    // Only add non-empty values to URL
    if (formValue.search?.trim()) queryParams.search = formValue.search;
    if (formValue.category) queryParams.category = formValue.category;
    if (formValue.brand) queryParams.brand = formValue.brand;
    if (formValue.minPrice !== null) queryParams.minPrice = formValue.minPrice;
    if (formValue.maxPrice !== null) queryParams.maxPrice = formValue.maxPrice;
    if (formValue.inStock) queryParams.inStock = 'true';
    if (formValue.sortBy !== 'name-asc') queryParams.sortBy = formValue.sortBy;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'replace'
    });
  }

  clearFilters() {
    this.filterForm.reset({
      search: '',
      category: '',
      brand: '',
      minPrice: null,
      maxPrice: null,
      inStock: false,
      sortBy: 'name-asc'
    });
  }
}