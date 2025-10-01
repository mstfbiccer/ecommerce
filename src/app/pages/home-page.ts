import { Component } from "@angular/core";
import { HeroBannerComponent } from "../components/hero-banner/hero-banner";
import { CategoryGridComponent } from "../components/category-grid";
import { ProductListComponent } from "../components/product-list";

@Component({
  standalone: true,
  imports: [HeroBannerComponent, CategoryGridComponent, ProductListComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Banner -->
      <div class="container mx-auto px-4 pt-8">
        <app-hero-banner 
          [image]="'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'"
          [title]="'En İyi Ürünler Burada'"
          [subtitle]="'Kaliteli ürünleri en uygun fiyatlarla keşfedin'">
        </app-hero-banner>
      </div>

      <!-- Categories Section -->
      <app-category-grid></app-category-grid>

      <!-- Products Section -->
      <app-product-list></app-product-list>
    </div>
  `
})
export class HomePage {}