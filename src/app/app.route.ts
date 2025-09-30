import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page').then((m) => m.HomePage),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail-page').then((m) => m.ProductDetailPage),
  }
];
