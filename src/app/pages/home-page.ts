import { Component } from "@angular/core";
import { ProductListComponent } from "../components/product-list";

@Component({
  standalone: true,
  imports: [ProductListComponent],
  template: '<app-product-list></app-product-list>'
})
export class HomePage {}