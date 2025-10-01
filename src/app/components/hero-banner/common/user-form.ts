import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <input [formControl]="name" class="user-input">
    <p>Değer: {{ name.value }}</p>
    <p *ngIf="name.invalid && name.touched">İsim zorunludur!</p>
  `,
  styles: [`
    .user-input {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 300px;
      box-sizing: border-box;
      margin-bottom: 0.5rem;
      margin-top: 1rem;
    }
    .user-input.ng-invalid.ng-touched {
      border-color: red;
    }
    p {
      font-family: Arial, sans-serif;
      color: #333;
    }
    p.ng-invalid {
      color: red;
    }
  `]
})
export class NameForm {
  name = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
}