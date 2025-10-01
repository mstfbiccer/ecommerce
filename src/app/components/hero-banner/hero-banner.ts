import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  discount?: string;
  gradient: string;
  textColor?: string;
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-banner relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden mb-12 rounded-2xl shadow-2xl">
      <!-- Slides Container -->
      <div class="slides-container relative w-full h-full rounded-2xl overflow-hidden">
        @for (slide of slides; track slide.id; let i = $index) {
          <div 
            class="slide absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
            [class.active]="i === currentSlide"
            [class.opacity-0]="i !== currentSlide"
            [class.opacity-100]="i === currentSlide">
            
            <!-- Background Image with Parallax Effect -->
            <div class="absolute inset-0 overflow-hidden">
              <img 
                [src]="slide.image" 
                [alt]="slide.title"
                class="w-full h-full object-cover transform transition-transform duration-[20s] ease-linear filter brightness-75"
                [class.scale-110]="i === currentSlide"
              />
            </div>
            
            <!-- Enhanced Dynamic Gradient Overlay -->
            <div class="absolute inset-0" [style.background]="slide.gradient"></div>
            
            <!-- Additional Dark Overlay for Better Text Readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
            
            <!-- Content -->
            <div class="absolute inset-0 flex items-center">
              <div class="container mx-auto px-4 md:px-8">
                <div class="max-w-4xl">
                  <!-- Discount Badge -->
                  @if (slide.discount) {
                    <div class="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse shadow-lg border border-red-400">
                      {{ slide.discount }}
                    </div>
                  }
                  
                  <!-- Title with Enhanced Styling -->
                  <h1 class="text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight"
                      [ngClass]="slide.textColor || 'text-white'"
                      [class.animate-slideInUp]="i === currentSlide"
                      style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                    {{ slide.title }}
                  </h1>
                  
                  <!-- Subtitle with Better Contrast -->
                  <h2 class="text-xl md:text-3xl lg:text-4xl mb-6 font-semibold"
                      [ngClass]="slide.textColor ? slide.textColor.replace('text-', 'text-').split('-')[0] + '-200' : 'text-yellow-200'"
                      [class.animate-slideInUp]="i === currentSlide"
                      style="animation-delay: 0.2s; text-shadow: 1px 1px 3px rgba(0,0,0,0.7);">
                    {{ slide.subtitle }}
                  </h2>
                  
                  <!-- Description with Improved Readability -->
                  <p class="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed font-medium"
                     [ngClass]="slide.textColor ? slide.textColor.replace('text-', 'text-').split('-')[0] + '-100' : 'text-gray-100'"
                     [class.animate-slideInUp]="i === currentSlide"
                     style="animation-delay: 0.4s; text-shadow: 1px 1px 2px rgba(0,0,0,0.6);">
                    {{ slide.description }}
                  </p>
                  
                  <!-- Enhanced CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4"
                       [class.animate-slideInUp]="i === currentSlide"
                       style="animation-delay: 0.6s;">
                    <a 
                      [routerLink]="slide.buttonLink"
                      class="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 group shadow-xl border border-blue-400/30">
                      {{ slide.buttonText }}
                      <svg class="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    </a>
                    
                    <button 
                      class="inline-flex items-center justify-center border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 font-semibold py-5 px-10 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-white">
                      Daha Fazla Bilgi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      
      <!-- Enhanced Navigation Dots -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        @for (slide of slides; track slide.id; let i = $index) {
          <button 
            (click)="goToSlide(i)"
            class="w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 backdrop-blur-sm"
            [class.bg-white]="i === currentSlide"
            [class.bg-white/30]="i !== currentSlide"
            [class.scale-125]="i === currentSlide"
            [class.border-white]="i === currentSlide">
          </button>
        }
      </div>
      
      <!-- Enhanced Navigation Arrows -->
      <button 
        (click)="previousSlide()"
        class="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg border border-white/20">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <button 
        (click)="nextSlide()"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg border border-white/20">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </button>
      
      <!-- Enhanced Floating Elements -->
      <div class="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-white/20 to-blue-400/20 rounded-full animate-float hidden lg:block backdrop-blur-sm shadow-xl"></div>
      <div class="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-float-delayed hidden lg:block backdrop-blur-sm shadow-lg"></div>
      <div class="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400/40 to-orange-400/40 rounded-full animate-pulse hidden lg:block backdrop-blur-sm shadow-md"></div>
      <div class="absolute top-1/4 left-1/3 w-12 h-12 bg-gradient-to-br from-green-400/25 to-teal-400/25 rounded-full animate-bounce hidden lg:block backdrop-blur-sm shadow-lg"></div>
    </div>
  `,
  styleUrls: ['./hero-banner.scss']
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  @Input() autoPlay: boolean = true;
  @Input() autoPlayInterval: number = 5000;
  
  currentSlide = 0;
  private autoPlayTimer?: any;
  
  slides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Yeni Sezon İndirimler',
      subtitle: '%50\'ye Varan İndirimler',
      description: 'En sevilen markaların en yeni koleksiyonlarında büyük fırsatlar sizi bekliyor. Kaçırmayın!',
      buttonText: 'Alışverişe Başla',
      buttonLink: '/products',
      discount: '50% İNDİRİM',
      gradient: 'linear-gradient(135deg, rgba(220, 38, 127, 0.8) 0%, rgba(59, 130, 246, 0.6) 50%, rgba(16, 185, 129, 0.7) 100%)',
      textColor: 'text-white'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
      title: 'Premium Teknoloji',
      subtitle: 'Geleceğin Ürünleri',
      description: 'En son teknoloji ürünleri ile hayatınızı kolaylaştırın. Kalite ve performansın buluştuğu noktada.',
      buttonText: 'Keşfet',
      buttonLink: '/products?category=electronics',
      gradient: 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(79, 70, 229, 0.7) 50%, rgba(139, 92, 246, 0.8) 100%)',
      textColor: 'text-white'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Moda & Stil',
      subtitle: 'Tarzını Yansıt',
      description: 'Kişiliğinizi yansıtan, rahatınızı ve şıklığınızı bir araya getiren moda parçaları burada.',
      buttonText: 'Koleksiyonu Gör',
      buttonLink: '/products?category=clothing',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.7) 50%, rgba(251, 146, 60, 0.6) 100%)',
      textColor: 'text-white'
    }
  ];

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Restart autoplay when user manually changes slide
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
}