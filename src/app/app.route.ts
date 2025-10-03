import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page').then((m) => m.HomePage),
    // canActivate: [authGuard] // Geçici olarak SSR test için kaldırıldı
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart-page').then((m) => m.CartPage),
    // canActivate: [authGuard]
  },
  {
    path: 'address',
    loadComponent: () =>
      import('./pages/address-page').then((m) => m.AddressPage),
    // canActivate: [authGuard]
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./pages/payment-page').then((m) => m.PaymentPage),
    // canActivate: [authGuard]
  },
  {
    path: 'order-complete',
    loadComponent: () =>
      import('./pages/order-complete-page').then((m) => m.OrderCompletePage),
    // canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-page').then((m) => m.AdminPage),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail-page').then((m) => m.ProductDetailPage),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
