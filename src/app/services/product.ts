import { Injectable } from '@angular/core';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  brand: string;
  inStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Product {
  list(): ProductType[] {
    return [
      { 
        id: 1, 
        name: 'MacBook Pro 14"', 
        price: 45000, 
        description: 'Apple M2 Pro işlemci ile güçlü performans', 
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Apple',
        inStock: true
      },
      { 
        id: 2, 
        name: 'iPhone 15 Pro', 
        price: 35000, 
        description: 'Titanium tasarım ile yeni nesil akıllı telefon', 
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Apple',
        inStock: true
      },
      { 
        id: 3, 
        name: 'Sony WH-1000XM5', 
        price: 8500, 
        description: 'Aktif gürültü engelleme özellikli kablosuz kulaklık', 
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Sony',
        inStock: true
      },
      { 
        id: 4, 
        name: 'Nike Air Max 270', 
        price: 3200, 
        description: 'Rahat ve şık spor ayakkabı', 
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Nike',
        inStock: true
      },
      { 
        id: 5, 
        name: 'Adidas Ultraboost 22', 
        price: 4500, 
        description: 'Yüksek performanslı koşu ayakkabısı', 
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Adidas',
        inStock: false
      },
      { 
        id: 6, 
        name: 'Samsung 55" QLED TV', 
        price: 25000, 
        description: '4K QLED teknolojisi ile üstün görüntü kalitesi', 
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Samsung',
        inStock: true
      },
      { 
        id: 7, 
        name: 'Dyson V15 Detect', 
        price: 12000, 
        description: 'Kablosuz şarjlı süpürge, lazer teknolojisi', 
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Dyson',
        inStock: true
      },
      { 
        id: 8, 
        name: 'Levi\'s 501 Jeans', 
        price: 850, 
        description: 'Klasik kesim kot pantolon', 
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Levi\'s',
        inStock: true
      },
      { 
        id: 9, 
        name: 'PlayStation 5', 
        price: 18000, 
        description: 'Yeni nesil oyun konsolu', 
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'Sony',
        inStock: false
      },
      { 
        id: 10, 
        name: 'IKEA MALM Yatak', 
        price: 2500, 
        description: 'Modern tasarım yatak çerçevesi', 
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        brand: 'IKEA',
        inStock: true
      }
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

  getCategories(): string[] {
    const products = this.list();
    return [...new Set(products.map(p => p.category))];
  }

  getBrands(): string[] {
    const products = this.list();
    return [...new Set(products.map(p => p.brand))];
  }
}
