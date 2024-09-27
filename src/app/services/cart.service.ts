import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsSignal = signal<Product[]>([]);

  constructor() { }

  toAddProduct(product: Product) {
    const index = this.productsSignal().findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedProducts = [...this.productsSignal()];
      updatedProducts[index] = { ...updatedProducts[index], quantity: updatedProducts[index].quantity + 1 };
      this.productsSignal.set(updatedProducts);
    } else {
      this.productsSignal.set([...this.productsSignal(), { ...product, quantity: 1 }]);
    }
  }

  toRemoveProduct(productId: number) {
    const updatedProducts = this.productsSignal().filter((item) => item.id !== productId);
    this.productsSignal.set(updatedProducts);
  }
}
