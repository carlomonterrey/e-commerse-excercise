import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ShortDescriptionPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cart_Service=inject(CartService)


onDeleteProduct(id:number){
  this.cart_Service.productsSignal.update((products)=>{
    
    return products.filter((product:Product)=>product.id!=id)
  })
}
}
