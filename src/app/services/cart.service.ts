import { Injectable, computed } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { patchState, signalState } from '@ngrx/signals';

export type ProductsState = {
  selectedProducts: Product[];
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly productsState = signalState<ProductsState>({
    selectedProducts: [],
  });

  public readonly productCounter = computed(() => {
    return this.productsState().selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
  });

  constructor() { }

  public toAddRemoveProduct(product: Product, action: string) {
    const selectedProducts = this.productsState().selectedProducts;
    const index = selectedProducts.findIndex(item => item.id === product.id);

    if (action === 'add') {
      if (index !== -1) {
        this.add(product);
      } else {
        patchState(this.productsState, {
          selectedProducts: [...selectedProducts, { ...product, quantity: 1 }],
        });
      }
    } else {
      if (index !== -1) {
        this.remove(product);
      }
    }
  }

  public add(product: Product): void {
    const selectedProducts = this.productsState().selectedProducts;
    const existingProduct = selectedProducts.find(item => item.id === product.id);
    
    if (existingProduct) {
      patchState(this.productsState, {
        selectedProducts: selectedProducts.map(item =>
          item.id === product.id ? { ...item, quantity: existingProduct.quantity + 1 } : item
        ),
      });
    }
  }

  public remove(product: Product): void {
    const selectedProducts = this.productsState().selectedProducts;
    const index = selectedProducts.findIndex(item => item.id === product.id);

    if (index !== -1) {
      const currentProduct = selectedProducts[index];

      if (currentProduct.quantity > 1) {
        patchState(this.productsState, {
          selectedProducts: selectedProducts.map(item =>
            item.id === product.id ? { ...item, quantity: currentProduct.quantity - 1 } : item
          ),
        });
      } else {
        patchState(this.productsState, {
          selectedProducts: selectedProducts.filter(item => item.id !== product.id),
        });
      }
    }
  }

  public cleanCart() {
    patchState(this.productsState, {
      selectedProducts: [],
    });
  }
}