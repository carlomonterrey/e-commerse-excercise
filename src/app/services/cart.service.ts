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
        this.updateProductQuantity(product.id, 1); 
      } else {
        this.addNewProduct(product); 
      }
    } else {
      if (index !== -1) {
        this.updateProductQuantity(product.id, -1); 
      }
    }
  }

  private addNewProduct(product: Product): void {
    patchState(this.productsState, {
      selectedProducts: [...this.productsState().selectedProducts, { ...product, quantity: 1 }],
    });
  }

  private updateProductQuantity(productId: number, delta: number): void {
    const selectedProducts = this.productsState().selectedProducts;
    const existingProduct = selectedProducts.find(item => item.id === productId);

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + delta;

      if (newQuantity > 0) {
        patchState(this.productsState, {
          selectedProducts: selectedProducts.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        });
      } else {
        patchState(this.productsState, {
          selectedProducts: selectedProducts.filter(item => item.id !== productId),
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