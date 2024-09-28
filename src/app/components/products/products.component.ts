import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { Product } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    ShortDescriptionPipe,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

products=signal<any[]>([])
product_service=inject(ProductService)
cart_service=inject(CartService)
app_Service=inject(AppService)
ngOnInit(): void {
  this.retrieveProducts()
}


retrieveProducts(){
  this.product_service.getAllProducts().subscribe({next:(res)=>{
    console.log(res);
    
this.product_service.products.set(res)  }})
}
addToCart(product:Product){
 this.cart_service.toAddRemoveProduct(product,'add')
console.log("cart",this.cart_service.productsSignal());

}
}
