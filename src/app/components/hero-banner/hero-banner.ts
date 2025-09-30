import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.html',
  styleUrls: ['./hero-banner.scss']
})
export class HeroBannerComponent {
  @Input() image: string = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
  @Input() title: string = 'Welcome to Our Store';
  @Input() url: string = '#';
  showAlert() {
    alert('Shop Now button clicked!');
  }
}