import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface OrderData {
  id: number;
  date: string;
  items: any[];
  total: number;
  address: any;
  payment: {
    last4: string;
    cardHolder: string;
  };
  status: string;
}

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        @if (orderData) {
          <!-- Success Header -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Siparişiniz Tamamlandı!</h1>
            <p class="text-lg text-gray-600 mb-2">Teşekkürler! Siparişiniz başarıyla alındı.</p>
            <p class="text-sm text-gray-500">Sipariş No: <span class="font-semibold">#{{ orderData.id }}</span></p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Order Details -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Order Items -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Sipariş Detayları</h2>
                
                <div class="space-y-4">
                  @for (item of orderData.items; track item.product.id) {
                    <div class="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <img 
                        [src]="item.product.image" 
                        [alt]="item.product.title"
                        class="w-16 h-16 object-contain bg-gray-50 rounded-lg">
                      <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-gray-900 mb-1">{{ item.product.title }}</h3>
                        <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ item.product.description }}</p>
                        <div class="flex items-center space-x-4 text-sm">
                          <span class="text-gray-600">Adet: {{ item.quantity }}</span>
                          <span class="text-gray-600">Birim Fiyat: \${{ item.product.price }}</span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-lg font-semibold text-gray-900">
                          \${{ (item.product.price * item.quantity).toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Delivery Address -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Teslimat Adresi</h2>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="font-medium text-gray-900 mb-2">
                    {{ orderData.address.shippingFirstName }} {{ orderData.address.shippingLastName }}
                  </p>
                  <p class="text-gray-700 mb-1">{{ orderData.address.shippingAddress }}</p>
                  <p class="text-gray-700 mb-2">
                    {{ orderData.address.shippingCity | titlecase }}, {{ orderData.address.shippingPostalCode }}
                  </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📞 {{ orderData.address.shippingPhone }}</span>
                    <span>✉️ {{ orderData.address.shippingEmail }}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Information -->
              <div class="bg-white rounded-2xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Ödeme Bilgileri</h2>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">Kredi Kartı</p>
                      <p class="text-sm text-gray-600">**** **** **** {{ orderData.payment.last4 }}</p>
                      <p class="text-sm text-gray-600">{{ orderData.payment.cardHolder }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 class="text-lg font-semibold text-blue-900 mb-4">Sırada Ne Var?</h3>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p class="font-medium text-blue-900">Sipariş Onayı</p>
                      <p class="text-sm text-blue-700">E-posta adresinize sipariş onay maili gönderilecek</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p class="font-medium text-blue-900">Hazırlanıyor</p>
                      <p class="text-sm text-blue-700">Siparişiniz 1-2 iş günü içinde hazırlanacak</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p class="font-medium text-blue-900">Kargoya Teslim</p>
                      <p class="text-sm text-blue-700">Kargo takip numarası SMS ile gönderilecek</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Sipariş Özeti</h2>
                
                <!-- Order Summary -->
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm">
                    <span>Sipariş Tarihi</span>
                    <span>{{ formatDate(orderData.date) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Sipariş No</span>
                    <span>#{{ orderData.id }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Durum</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Tamamlandı
                    </span>
                  </div>
                </div>

                <!-- Price Breakdown -->
                <div class="border-t pt-4 space-y-2 mb-6">
                  <div class="flex justify-between text-sm">
                    <span>Ara Toplam</span>
                    <span>\${{ getSubtotal().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Kargo</span>
                    <span>\${{ getShippingCost().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                    <span>Toplam</span>
                    <span>\${{ orderData.total.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                  <button 
                    (click)="downloadInvoice()"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Fatura İndir</span>
                  </button>
                  
                  <button 
                    (click)="continueShopping()"
                    class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Alışverişe Devam Et
                  </button>
                </div>

                <!-- Contact Support -->
                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h3 class="text-sm font-medium text-gray-900">Yardıma mı ihtiyacınız var?</h3>
                      <p class="text-xs text-gray-600 mt-1">
                        Sorularınız için 
                        <a href="#" class="text-blue-600 hover:underline">destek ekibimizle</a> 
                        iletişime geçin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <!-- No Order Data -->
          <div class="text-center py-12">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Sipariş Bulunamadı</h1>
            <p class="text-gray-600 mb-6">Görüntülenecek sipariş bilgisi bulunamadı.</p>
            <button 
              (click)="continueShopping()"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Alışverişe Başla
            </button>
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
export class OrderCompletePage implements OnInit {
  router = inject(Router);
  orderData: OrderData | null = null;

  ngOnInit() {
    this.loadOrderData();
  }

  loadOrderData() {
    const orderDataString = localStorage.getItem('lastOrder');
    if (orderDataString) {
      this.orderData = JSON.parse(orderDataString);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getSubtotal(): number {
    if (!this.orderData) return 0;
    return this.orderData.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getShippingCost(): number {
    if (!this.orderData) return 0;
    return this.orderData.total - this.getSubtotal();
  }

  downloadInvoice() {
    // Simulate invoice download
    const invoiceData = {
      orderNumber: this.orderData?.id,
      date: this.orderData?.date,
      total: this.orderData?.total,
      customerName: `${this.orderData?.address.shippingFirstName} ${this.orderData?.address.shippingLastName}`
    };

    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fatura-${this.orderData?.id}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  continueShopping() {
    // Clear order data from localStorage
    localStorage.removeItem('lastOrder');
    localStorage.removeItem('addressData');
    
    // Navigate to home page
    this.router.navigate(['/']);
  }
}