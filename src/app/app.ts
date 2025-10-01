import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroBannerComponent } from './components/hero-banner/hero-banner';
import { NameForm } from './components/hero-banner/common/user-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroBannerComponent,NameForm],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})

export class App {
}
