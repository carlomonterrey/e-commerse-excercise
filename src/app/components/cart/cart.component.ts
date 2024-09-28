import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { Product } from '../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ShortDescriptionPipe,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cart_Service=inject(CartService)


onDeleteProduct(product:Product){
 this.cart_Service.toAddRemoveProduct(product,'remove')
}
onAddProduct(product:Product){
  this.cart_Service.toAddRemoveProduct(product,'add')
 }
 onSubmit(){
  setTimeout(() => {
    Swal.fire({
      title: "Successfully",
      text: "The sale was successfully!",
      icon: "success"
    });this.cart_Service.cleanCart()
  }, 300);
 }
}
