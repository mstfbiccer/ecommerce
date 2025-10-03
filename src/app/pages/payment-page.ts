import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Ödeme Bilgileri</h1>
              <p class="text-gray-600 mt-1">Kredi kartı bilgilerinizi güvenle girin</p>
            </div>
            <button 
              (click)="goBack()"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Adres Bilgilerine Dön</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Payment Form -->
          <div class="lg:col-span-2">
            <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="space-y-8">
              <!-- Kredi Kartı Bilgileri -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-800">Kredi Kartı Bilgileri</h2>
                </div>
                
                <!-- Kart Numarası -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                  <input 
                    formControlName="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    (input)="formatCardNumber($event)"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg tracking-wider"
                    [class.border-red-500]="paymentForm.get('cardNumber')?.invalid && paymentForm.get('cardNumber')?.touched">
                  <div *ngIf="paymentForm.get('cardNumber')?.invalid && paymentForm.get('cardNumber')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    <span *ngIf="paymentForm.get('cardNumber')?.errors?.['required']">Kart numarası zorunludur</span>
                    <span *ngIf="paymentForm.get('cardNumber')?.errors?.['pattern']">Geçerli bir kart numarası girin</span>
                  </div>
                </div>

                <!-- Kart Sahibi -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kart Sahibinin Adı *</label>
                  <input 
                    formControlName="cardHolder"
                    type="text"
                    placeholder="JOHN DOE"
                    (input)="formatCardHolder($event)"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
                    [class.border-red-500]="paymentForm.get('cardHolder')?.invalid && paymentForm.get('cardHolder')?.touched">
                  <div *ngIf="paymentForm.get('cardHolder')?.invalid && paymentForm.get('cardHolder')?.touched" 
                       class="text-red-500 text-sm mt-1">Kart sahibinin adı zorunludur</div>
                </div>

                <!-- Son Kullanma Tarihi ve CVV -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Son Kullanma Tarihi *</label>
                    <input 
                      formControlName="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      maxlength="5"
                      (input)="formatExpiryDate($event)"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="paymentForm.get('expiryDate')?.invalid && paymentForm.get('expiryDate')?.touched">
                    <div *ngIf="paymentForm.get('expiryDate')?.invalid && paymentForm.get('expiryDate')?.touched" 
                         class="text-red-500 text-sm mt-1">
                      <span *ngIf="paymentForm.get('expiryDate')?.errors?.['required']">Son kullanma tarihi zorunludur</span>
                      <span *ngIf="paymentForm.get('expiryDate')?.errors?.['pattern']">Geçerli bir tarih girin (MM/YY)</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                    <input 
                      formControlName="cvv"
                      type="password"
                      placeholder="123"
                      maxlength="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="paymentForm.get('cvv')?.invalid && paymentForm.get('cvv')?.touched">
                    <div *ngIf="paymentForm.get('cvv')?.invalid && paymentForm.get('cvv')?.touched" 
                         class="text-red-500 text-sm mt-1">
                      <span *ngIf="paymentForm.get('cvv')?.errors?.['required']">CVV zorunludur</span>
                      <span *ngIf="paymentForm.get('cvv')?.errors?.['pattern']">Geçerli bir CVV girin</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Teslimat Seçenekleri -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Teslimat Seçenekleri</h2>
                
                <div class="space-y-4">
                  <label class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input 
                      formControlName="shippingOption"
                      type="radio"
                      value="standard"
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                    <div class="flex-1">
                      <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-900">Standart Teslimat</span>
                        <span class="text-sm font-semibold text-gray-900">{{ cartStore.totalPrice() >= 500 ? 'Ücretsiz' : '$15.00' }}</span>
                      </div>
                      <p class="text-sm text-gray-500">3-5 iş günü içinde teslimat</p>
                    </div>
                  </label>
                  
                  <label class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input 
                      formControlName="shippingOption"
                      type="radio"
                      value="express"
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                    <div class="flex-1">
                      <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-900">Hızlı Teslimat</span>
                        <span class="text-sm font-semibold text-gray-900">$25.00</span>
                      </div>
                      <p class="text-sm text-gray-500">1-2 iş günü içinde teslimat</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Sözleşme ve Onaylar -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Sözleşmeler ve Onaylar</h2>
                
                <div class="space-y-4">
                  <label class="flex items-start space-x-3">
                    <input 
                      formControlName="acceptTerms"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1">
                    <span class="text-sm text-gray-700">
                      <a href="#" class="text-blue-600 hover:underline">Kullanım şartları</a> ve 
                      <a href="#" class="text-blue-600 hover:underline">gizlilik politikası</a>nı okudum ve kabul ediyorum. *
                    </span>
                  </label>
                  <div *ngIf="paymentForm.get('acceptTerms')?.invalid && paymentForm.get('acceptTerms')?.touched" 
                       class="text-red-500 text-sm">Şartları kabul etmeniz gerekmektedir</div>
                  
                  <label class="flex items-start space-x-3">
                    <input 
                      formControlName="newsletter"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1">
                    <span class="text-sm text-gray-700">
                      Kampanya ve promosyon e-postalarını almak istiyorum.
                    </span>
                  </label>
                </div>
              </div>

              <!-- Form Buttons -->
              <div class="flex justify-between">
                <button 
                  type="button"
                  (click)="goBack()"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Geri Dön
                </button>
                <button 
                  type="submit"
                  [disabled]="paymentForm.invalid || isProcessing"
                  class="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                  <svg *ngIf="isProcessing" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg *ngIf="!isProcessing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>{{ isProcessing ? 'Ödeme İşleniyor...' : 'Siparişi Tamamla' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">Sipariş Özeti</h2>
              
              <!-- Cart Items -->
              <div class="space-y-4 mb-6">
                @for (item of cartStore.items(); track item.product.id) {
                  <div class="flex items-center space-x-4">
                    <img 
                      [src]="item.product.image" 
                      [alt]="item.product.title"
                      class="w-16 h-16 object-contain bg-gray-50 rounded-lg">
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm font-medium text-gray-900 truncate">{{ item.product.title }}</h3>
                      <p class="text-sm text-gray-500">Adet: {{ item.quantity }}</p>
                    </div>
                    <div class="text-sm font-semibold text-gray-900">
                      \${{ (item.product.price * item.quantity).toFixed(2) }}
                    </div>
                  </div>
                }
              </div>
              
              <!-- Summary -->
              <div class="border-t pt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Ara Toplam</span>
                  <span>\${{ cartStore.totalPrice().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Kargo</span>
                  <span class="text-green-600">{{ getShippingCost() === 0 ? 'Ücretsiz' : '$' + getShippingCost().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Toplam</span>
                  <span>\${{ getFinalTotal().toFixed(2) }}</span>
                </div>
              </div>

              <!-- Security Info -->
              <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <div>
                    <h3 class="text-sm font-medium text-green-800">Güvenli Ödeme</h3>
                    <p class="text-xs text-green-700 mt-1">Kartınız SSL ile korunmaktadır</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class PaymentPage {
  cartStore = inject(CartStore);
  router = inject(Router);
  fb = inject(FormBuilder);

  paymentForm: FormGroup;
  isProcessing = false;

  constructor() {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
      cardHolder: ['', [Validators.required, Validators.minLength(2)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      shippingOption: ['standard', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      newsletter: [false]
    });
  }

  goBack() {
    this.router.navigate(['/address']);
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    event.target.value = formattedValue;
    this.paymentForm.get('cardNumber')?.setValue(formattedValue, { emitEvent: false });
  }

  formatCardHolder(event: any) {
    let value = event.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    event.target.value = value;
    this.paymentForm.get('cardHolder')?.setValue(value, { emitEvent: false });
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }

  getShippingCost(): number {
    const shippingOption = this.paymentForm.get('shippingOption')?.value;
    const subtotal = this.cartStore.totalPrice();
    
    if (shippingOption === 'express') {
      return 25;
    } else {
      return subtotal >= 500 ? 0 : 15;
    }
  }

  getFinalTotal(): number {
    const subtotal = this.cartStore.totalPrice();
    const shipping = this.getShippingCost();
    return subtotal + shipping;
  }

  async onSubmit() {
    if (this.paymentForm.valid) {
      this.isProcessing = true;
      
      // Simulating payment processing
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Save order data
        const orderData = {
          id: Date.now(),
          date: new Date().toISOString(),
          items: this.cartStore.items(),
          total: this.getFinalTotal(),
          address: JSON.parse(localStorage.getItem('addressData') || '{}'),
          payment: {
            last4: this.paymentForm.get('cardNumber')?.value.slice(-4),
            cardHolder: this.paymentForm.get('cardHolder')?.value
          },
          status: 'completed'
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Clear cart
        this.cartStore.clearCart();
        
        // Navigate to success page
        this.router.navigate(['/order-complete']);
        
      } catch (error) {
        console.error('Payment failed:', error);
        alert('Ödeme işlemi başarısız. Lütfen tekrar deneyin.');
      } finally {
        this.isProcessing = false;
      }
    } else {
      // Form geçersizse tüm alanları touch et
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
    }
  }
}