import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Sepetim</h1>
              <p class="text-gray-600 mt-1">
                {{ cartStore.totalItems() }} ürün sepetinizde
              </p>
            </div>
            <button 
              (click)="goBack()"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Alışverişe Devam Et</span>
            </button>
          </div>
        </div>

        @if (cartStore.isEmpty()) {
          <!-- Empty Cart -->
          <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div class="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-700 mb-3">Sepetiniz Boş</h2>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünleri keşfedin.
            </p>
            <button 
              (click)="goBack()"
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Alışverişe Başla
            </button>
          </div>
        } @else {
          <!-- Cart Content -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div class="p-6 border-b border-gray-100">
                  <h2 class="text-xl font-semibold text-gray-800">Sepetinizdeki Ürünler</h2>
                </div>
                
                <div class="divide-y divide-gray-100">
                  @for (item of cartStore.items(); track item.product.id) {
                    <div class="p-6 hover:bg-gray-50 transition-colors">
                      <div class="flex items-start space-x-6">
                        <!-- Product Image -->
                        <div class="flex-shrink-0">
                          <img 
                            [src]="item.product.image" 
                            [alt]="item.product.title"
                            class="w-24 h-24 object-contain bg-white rounded-xl border border-gray-200 shadow-sm">
                        </div>
                        
                        <!-- Product Info -->
                        <div class="flex-1 min-w-0">
                          <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {{ item.product.title }}
                          </h3>
                          <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                            {{ item.product.description }}
                          </p>
                          <div class="flex items-center space-x-4">
                            <span class="text-2xl font-bold text-green-600">
                              \${{ item.product.price }}
                            </span>
                            <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                              {{ item.product.category }}
                            </span>
                          </div>
                        </div>
                        
                        <!-- Quantity & Actions -->
                        <div class="flex flex-col items-end space-y-4">
                          <!-- Quantity Controls -->
                          <div class="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                            <button 
                              (click)="decreaseQuantity(item.product.id)"
                              class="w-8 h-8 bg-white rounded-md flex items-center justify-center text-gray-600 hover:text-gray-800 hover:shadow-md transition-all duration-200 border border-gray-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span class="text-lg font-bold text-gray-800 w-10 text-center">{{ item.quantity }}</span>
                            <button 
                              (click)="increaseQuantity(item.product.id)"
                              class="w-8 h-8 bg-white rounded-md flex items-center justify-center text-gray-600 hover:text-gray-800 hover:shadow-md transition-all duration-200 border border-gray-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                            </button>
                          </div>
                          
                          <!-- Total Price for Item -->
                          <div class="text-right">
                            <p class="text-2xl font-bold text-gray-900">
                              \${{ (item.product.price * item.quantity).toFixed(2) }}
                            </p>
                            <p class="text-sm text-gray-500">
                              \${{ item.product.price }} × {{ item.quantity }}
                            </p>
                          </div>
                          
                          <!-- Remove Button -->
                          <button 
                            (click)="removeItem(item.product.id)"
                            class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              
              <!-- Clear Cart Button -->
              <div class="mt-6">
                <button 
                  (click)="clearCart()"
                  class="flex items-center space-x-2 px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>Sepeti Temizle</span>
                </button>
              </div>
            </div>
            
            <!-- Order Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Sipariş Özeti</h2>
                
                <!-- Summary Details -->
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-gray-600">
                    <span>Ürün Toplamı ({{ cartStore.totalItems() }} ürün)</span>
                    <span>\${{ cartStore.totalPrice().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Kargo</span>
                    <span class="text-green-600 font-medium">
                      {{ cartStore.totalPrice() >= 500 ? 'Ücretsiz' : '$15.00' }}
                    </span>
                  </div>
                  @if (cartStore.totalPrice() < 500) {
                    <div class="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                      🚚 <strong>\${{ (500 - cartStore.totalPrice()).toFixed(2) }}</strong> daha ekleyerek ücretsiz kargo kazanın!
                    </div>
                  }
                  <div class="border-t border-gray-200 pt-4">
                    <div class="flex justify-between text-lg font-bold text-gray-900">
                      <span>Toplam</span>
                      <span>\${{ getFinalTotal().toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Checkout Button -->
                <button 
                  (click)="proceedToCheckout()"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mb-4">
                  <div class="flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span>Ödemeye Geç</span>
                  </div>
                </button>
                
                <!-- Security Badge -->
                <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>Güvenli ödeme</span>
                </div>
              </div>
            </div>
          </div>
        }
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
export class CartPage {
  cartStore = inject(CartStore);
  router = inject(Router);

  goBack() {
    this.router.navigate(['/']);
  }

  increaseQuantity(productId: number) {
    const item = this.cartStore.items().find(item => item.product.id === productId);
    if (item) {
      this.cartStore.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartStore.items().find(item => item.product.id === productId);
    if (item) {
      this.cartStore.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number) {
    this.cartStore.removeFromCart(productId);
  }

  clearCart() {
    if (confirm('Sepetinizdeki tüm ürünleri silmek istediğinizden emin misiniz?')) {
      this.cartStore.clearCart();
    }
  }

  getFinalTotal(): number {
    const subtotal = this.cartStore.totalPrice();
    const shipping = subtotal >= 500 ? 0 : 15;
    return subtotal + shipping;
  }

  proceedToCheckout() {
    this.router.navigate(['/address']);
  }
}