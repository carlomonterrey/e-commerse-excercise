import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsSignal = signal<Product[]>([]);

  constructor() { }

  toAddRemoveProduct(product: Product,action:string) {
    const index = this.productsSignal().findIndex((item) => item.id === product.id);
    if (index !== -1) {
    
      const updatedProducts = [...this.productsSignal()];
      if (action==='add') {
        updatedProducts[index] = { ...updatedProducts[index], quantity: updatedProducts[index].quantity + 1 };
console.log(updatedProducts[index]);
this.productsSignal.set(updatedProducts);

      }else{
        if (updatedProducts[index].quantity>1 ) {
          updatedProducts[index] = { ...updatedProducts[index], quantity: updatedProducts[index].quantity - 1 };
          this.productsSignal.set(updatedProducts);

        }
        else{
          const updatedProducts = this.productsSignal().filter((item) => item.id !== product.id);
          this.productsSignal.set(updatedProducts);
        }

      }

    } else {
      if (action==='add') {
        this.productsSignal.set([...this.productsSignal(), { ...product, quantity: 1 }]);

      }else{
        const updatedProducts = this.productsSignal().filter((item) => item.id !== product.id);
        this.productsSignal.set(updatedProducts);
      }

    }
    
  }


}
