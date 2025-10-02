import { Injectable, inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable, map, retry, timer, throwError, of } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CategoryType {
  name: string;
  image: string;
}

// Transfer State keys
const PRODUCTS_KEY = makeStateKey<ProductType[]>('products');
const CATEGORIES_KEY = makeStateKey<CategoryType[]>('categories');
const PRODUCT_KEY = (id: number) => makeStateKey<ProductType>(`product-${id}`);

@Injectable({
  providedIn: 'root'
})
export class Product {
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);
  private baseUrl: string;

  constructor(private http: HttpClient) {
    // Use local API endpoints for better SSR performance and caching
    if (isPlatformBrowser(this.platformId)) {
      this.baseUrl = '/api'; // Client-side: use relative URL
    } else {
      // Server-side: use absolute URL for internal requests
      this.baseUrl = process.env['SSR_API_BASE_URL'] || 'http://localhost:4000/api';
    }
  }

  list(): Observable<ProductType[]> {
    // Check if data exists in transfer state (from SSR)
    const cachedProducts = this.transferState.get(PRODUCTS_KEY, null);
    if (cachedProducts) {
      // Remove from transfer state to free memory
      this.transferState.remove(PRODUCTS_KEY);
      return of(cachedProducts);
    }

    const products$ = this.http.get<ProductType[]>(`${this.baseUrl}/products`).pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          console.log(`Retry attempt ${retryCount} for error:`, error.status);
          if (error.status === 404 || error.status === 500 || error.status === 0) {
            return timer(500);
          }
          return throwError(() => error);
        }
      })
    );

    // Store in transfer state if on server
    if (isPlatformServer(this.platformId)) {
      products$.subscribe(products => {
        this.transferState.set(PRODUCTS_KEY, products);
      });
    }

    return products$;
  }

  getById(id: number): Observable<ProductType> {
    // Check if data exists in transfer state (from SSR)
    const productKey = PRODUCT_KEY(id);
    const cachedProduct = this.transferState.get(productKey, null);
    if (cachedProduct) {
      // Remove from transfer state to free memory
      this.transferState.remove(productKey);
      return of(cachedProduct);
    }

    const product$ = this.http.get<ProductType>(`${this.baseUrl}/products/${id}`).pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          console.log(`Retry attempt ${retryCount} for error:`, error.status);
          if (error.status === 404 || error.status === 500 || error.status === 0) {
            return timer(1000);
          }
          return throwError(() => error);
        }
      })
    );

    // Store in transfer state if on server
    if (isPlatformServer(this.platformId)) {
      product$.subscribe(product => {
        this.transferState.set(productKey, product);
      });
    }

    return product$;
  }

  getCategories(): Observable<CategoryType[]> {
    // Check if data exists in transfer state (from SSR)
    const cachedCategories = this.transferState.get(CATEGORIES_KEY, null);
    if (cachedCategories) {
      // Remove from transfer state to free memory
      this.transferState.remove(CATEGORIES_KEY);
      return of(cachedCategories);
    }

    const categories$ = this.http.get<string[]>(`${this.baseUrl}/products/categories`).pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          console.log(`Retry attempt ${retryCount} for error:`, error.status);
          if (error.status === 404 || error.status === 500 || error.status === 0) {
            return timer(1000);
          }
          return throwError(() => error);
        }
      }),
      map(categories => categories.map(category => ({
        name: category,
        image: this.getCategoryImage(category)
      })))
    );

    // Store in transfer state if on server
    if (isPlatformServer(this.platformId)) {
      categories$.subscribe(categories => {
        this.transferState.set(CATEGORIES_KEY, categories);
      });
    }

    return categories$;
  }

  uploadProductCatalog(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('catalog', file);
    
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      retry({
        count: 2,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          console.log(`Upload retry attempt ${retryCount} for error:`, error.status);
          if (error.status === 413 || error.status === 415) {
            // File too large or unsupported media type - don't retry
            return throwError(() => error);
          }
          if (error.status === 0 || error.status >= 500) {
            return timer(1000);
          }
          return throwError(() => error);
        }
      })
    );
  }

  private getCategoryImage(category: string): string {
    const categoryImages: { [key: string]: string } = {
      "men's clothing": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "women's clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "electronics": "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    
    return categoryImages[category] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
}
