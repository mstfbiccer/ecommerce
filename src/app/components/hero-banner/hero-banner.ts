import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-banner relative h-64 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-lg shadow-lg mb-12">
      <img 
        [src]="image" 
        [alt]="title"
        class="hero-image absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <!-- Content overlay -->
      <div class="hero-content absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white px-4 max-w-4xl">
          <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {{ title }}
          </h1>
          <p class="text-lg md:text-xl mb-6 opacity-90">{{ subtitle }}</p>
          
          <a 
            (click)="showAlert()"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            Alışverişe Başla
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hero-banner.scss']
})
export class HeroBannerComponent {
  @Input() image: string = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  @Input() title: string = 'En İyi Ürünler Burada';
  @Input() subtitle: string = 'Kaliteli ürünleri en uygun fiyatlarla keşfedin';
  @Input() url: string = '#';
  
  showAlert() {
    alert('Alışverişe başla butonuna tıklandı!');
  }
}