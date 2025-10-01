import { Component } from "@angular/core";
import { HeroBannerComponent } from "../components/hero-banner/hero-banner";
import { CategoryGridComponent } from "../components/category-grid";
import { ProductListComponent } from "../components/product-list";
import { CatalogUploadComponent } from "../components/catalog-upload";

@Component({
  standalone: true,
  imports: [HeroBannerComponent, CategoryGridComponent, ProductListComponent, CatalogUploadComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Banner -->
      <div class="container mx-auto px-4 pt-8">
        <app-hero-banner></app-hero-banner>
      </div>

      <!-- Catalog Upload Section -->
      <div class="container mx-auto px-4">
        <app-catalog-upload></app-catalog-upload>
      </div>

      <!-- Categories Section -->
      <app-category-grid></app-category-grid>

      <!-- Products Section -->
      <app-product-list></app-product-list>
    </div>
  `
})
export class HomePage {}