import { Injectable } from '@angular/core';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class Product {
  list(): ProductType[] {
    return [
      { id: 1, name: 'Product 1', price: 100, description: 'High quality product', category: 'Electronics' },
      { id: 2, name: 'Product 2', price: 200, description: 'Premium product', category: 'Fashion' },
      { id: 3, name: 'Product 3', price: 300, description: 'Luxury product', category: 'Home' },
    ];
  }

  getById(id: number): Promise<ProductType | undefined> {
    // Gerçek API çağrısını simüle etmek için Promise kullanıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.list().find(p => p.id === id);
        console.log('Fetched product:', product);
        resolve(product);
      }, 1000); // 1 saniye gecikme
    });
  }
}
