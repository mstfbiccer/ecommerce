import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameForm } from './components/hero-banner/common/user-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NameForm],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})

export class App {
}
