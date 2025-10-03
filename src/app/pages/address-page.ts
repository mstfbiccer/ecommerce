import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartStore } from '../services/cart.store';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Adres Bilgileri</h1>
              <p class="text-gray-600 mt-1">Teslimat ve fatura adresinizi girin</p>
            </div>
            <button 
              (click)="goBack()"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Sepete Dön</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Address Form -->
          <div class="lg:col-span-2">
            <form [formGroup]="addressForm" (ngSubmit)="onSubmit()" class="space-y-8">
              <!-- Teslimat Adresi -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Teslimat Adresi</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Ad -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                    <input 
                      formControlName="shippingFirstName"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingFirstName')?.invalid && addressForm.get('shippingFirstName')?.touched"
                      placeholder="Adınızı girin">
                    <div *ngIf="addressForm.get('shippingFirstName')?.invalid && addressForm.get('shippingFirstName')?.touched" 
                         class="text-red-500 text-sm mt-1">Ad alanı zorunludur</div>
                  </div>
                  
                  <!-- Soyad -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                    <input 
                      formControlName="shippingLastName"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingLastName')?.invalid && addressForm.get('shippingLastName')?.touched"
                      placeholder="Soyadınızı girin">
                    <div *ngIf="addressForm.get('shippingLastName')?.invalid && addressForm.get('shippingLastName')?.touched" 
                         class="text-red-500 text-sm mt-1">Soyad alanı zorunludur</div>
                  </div>
                </div>

                <!-- Telefon ve Email -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                    <input 
                      formControlName="shippingPhone"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingPhone')?.invalid && addressForm.get('shippingPhone')?.touched"
                      placeholder="05XX XXX XX XX">
                    <div *ngIf="addressForm.get('shippingPhone')?.invalid && addressForm.get('shippingPhone')?.touched" 
                         class="text-red-500 text-sm mt-1">
                      <span *ngIf="addressForm.get('shippingPhone')?.errors?.['required']">Telefon numarası zorunludur</span>
                      <span *ngIf="addressForm.get('shippingPhone')?.errors?.['pattern']">Geçerli bir telefon numarası girin</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                    <input 
                      formControlName="shippingEmail"
                      type="email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingEmail')?.invalid && addressForm.get('shippingEmail')?.touched"
                      placeholder="ornek@email.com">
                    <div *ngIf="addressForm.get('shippingEmail')?.invalid && addressForm.get('shippingEmail')?.touched" 
                         class="text-red-500 text-sm mt-1">
                      <span *ngIf="addressForm.get('shippingEmail')?.errors?.['required']">E-posta zorunludur</span>
                      <span *ngIf="addressForm.get('shippingEmail')?.errors?.['email']">Geçerli bir e-posta girin</span>
                    </div>
                  </div>
                </div>

                <!-- Adres -->
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                  <textarea 
                    formControlName="shippingAddress"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    [class.border-red-500]="addressForm.get('shippingAddress')?.invalid && addressForm.get('shippingAddress')?.touched"
                    placeholder="Mahalle, sokak, apartman no vb."></textarea>
                  <div *ngIf="addressForm.get('shippingAddress')?.invalid && addressForm.get('shippingAddress')?.touched" 
                       class="text-red-500 text-sm mt-1">Adres alanı zorunludur</div>
                </div>

                <!-- Şehir ve Posta Kodu -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                    <select 
                      formControlName="shippingCity"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingCity')?.invalid && addressForm.get('shippingCity')?.touched">
                      <option value="">Şehir seçin</option>
                      <option value="istanbul">İstanbul</option>
                      <option value="ankara">Ankara</option>
                      <option value="izmir">İzmir</option>
                      <option value="bursa">Bursa</option>
                      <option value="antalya">Antalya</option>
                    </select>
                    <div *ngIf="addressForm.get('shippingCity')?.invalid && addressForm.get('shippingCity')?.touched" 
                         class="text-red-500 text-sm mt-1">Şehir seçimi zorunludur</div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Posta Kodu *</label>
                    <input 
                      formControlName="shippingPostalCode"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('shippingPostalCode')?.invalid && addressForm.get('shippingPostalCode')?.touched"
                      placeholder="34000">
                    <div *ngIf="addressForm.get('shippingPostalCode')?.invalid && addressForm.get('shippingPostalCode')?.touched" 
                         class="text-red-500 text-sm mt-1">Posta kodu zorunludur</div>
                  </div>
                </div>
              </div>

              <!-- Fatura Adresi -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-gray-800">Fatura Adresi</h2>
                  <label class="flex items-center space-x-2">
                    <input 
                      formControlName="sameAsShipping"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                    <span class="text-sm text-gray-700">Teslimat adresi ile aynı</span>
                  </label>
                </div>

                <div *ngIf="!addressForm.get('sameAsShipping')?.value" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Fatura Ad -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                      <input 
                        formControlName="billingFirstName"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        [class.border-red-500]="addressForm.get('billingFirstName')?.invalid && addressForm.get('billingFirstName')?.touched"
                        placeholder="Adınızı girin">
                    </div>
                    
                    <!-- Fatura Soyad -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                      <input 
                        formControlName="billingLastName"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        [class.border-red-500]="addressForm.get('billingLastName')?.invalid && addressForm.get('billingLastName')?.touched"
                        placeholder="Soyadınızı girin">
                    </div>
                  </div>

                  <!-- Fatura Adresi -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                    <textarea 
                      formControlName="billingAddress"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      [class.border-red-500]="addressForm.get('billingAddress')?.invalid && addressForm.get('billingAddress')?.touched"
                      placeholder="Fatura adresi"></textarea>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                      <select 
                        formControlName="billingCity"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                        <option value="">Şehir seçin</option>
                        <option value="istanbul">İstanbul</option>
                        <option value="ankara">Ankara</option>
                        <option value="izmir">İzmir</option>
                        <option value="bursa">Bursa</option>
                        <option value="antalya">Antalya</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Posta Kodu *</label>
                      <input 
                        formControlName="billingPostalCode"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="34000">
                    </div>
                  </div>
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
                  [disabled]="addressForm.invalid"
                  class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Ödemeye Geç
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
                  <span class="text-green-600">{{ cartStore.totalPrice() >= 500 ? 'Ücretsiz' : '$15.00' }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Toplam</span>
                  <span>\${{ getFinalTotal().toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `]
})
export class AddressPage {
  cartStore = inject(CartStore);
  router = inject(Router);
  fb = inject(FormBuilder);

  addressForm: FormGroup;

  constructor() {
    this.addressForm = this.fb.group({
      // Teslimat Adresi
      shippingFirstName: ['', [Validators.required]],
      shippingLastName: ['', [Validators.required]],
      shippingPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      shippingEmail: ['', [Validators.required, Validators.email]],
      shippingAddress: ['', [Validators.required]],
      shippingCity: ['', [Validators.required]],
      shippingPostalCode: ['', [Validators.required]],
      
      // Fatura Adresi
      sameAsShipping: [true],
      billingFirstName: [''],
      billingLastName: [''],
      billingAddress: [''],
      billingCity: [''],
      billingPostalCode: ['']
    });

    // Teslimat adresi ile aynı checkbox'ı dinle
    this.addressForm.get('sameAsShipping')?.valueChanges.subscribe(sameAsShipping => {
      if (sameAsShipping) {
        // Fatura adresi validasyonlarını kaldır
        this.addressForm.get('billingFirstName')?.clearValidators();
        this.addressForm.get('billingLastName')?.clearValidators();
        this.addressForm.get('billingAddress')?.clearValidators();
        this.addressForm.get('billingCity')?.clearValidators();
        this.addressForm.get('billingPostalCode')?.clearValidators();
      } else {
        // Fatura adresi validasyonlarını ekle
        this.addressForm.get('billingFirstName')?.setValidators([Validators.required]);
        this.addressForm.get('billingLastName')?.setValidators([Validators.required]);
        this.addressForm.get('billingAddress')?.setValidators([Validators.required]);
        this.addressForm.get('billingCity')?.setValidators([Validators.required]);
        this.addressForm.get('billingPostalCode')?.setValidators([Validators.required]);
      }
      // Validasyonları güncelle
      this.addressForm.get('billingFirstName')?.updateValueAndValidity();
      this.addressForm.get('billingLastName')?.updateValueAndValidity();
      this.addressForm.get('billingAddress')?.updateValueAndValidity();
      this.addressForm.get('billingCity')?.updateValueAndValidity();
      this.addressForm.get('billingPostalCode')?.updateValueAndValidity();
    });
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  getFinalTotal(): number {
    const subtotal = this.cartStore.totalPrice();
    const shipping = subtotal >= 500 ? 0 : 15;
    return subtotal + shipping;
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // Adres bilgilerini localStorage'a kaydet
      const addressData = this.addressForm.value;
      localStorage.setItem('addressData', JSON.stringify(addressData));
      
      // Ödeme sayfasına yönlendir
      this.router.navigate(['/payment']);
    } else {
      // Form geçersizse tüm alanları touch et
      Object.keys(this.addressForm.controls).forEach(key => {
        this.addressForm.get(key)?.markAsTouched();
      });
    }
  }
}