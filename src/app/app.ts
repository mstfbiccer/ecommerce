import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameForm } from './components/hero-banner/common/user-form';
import { SkillsFormComponent } from './components/hero-banner/common/dynamic-user-form';
import { UserFormComponentWithSkills } from './components/hero-banner/common/dynamic-custom-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})

export class App {
}
