import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroBannerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})

export class App {
}
