import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { UpperCasePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    UpperCasePipe,
    CartComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  category_Service=inject(CategoryService)
  cart_Service=inject(CartService)
  product_Service=inject(ProductService)
  user_service=inject(UserService)
  categories=signal<any[]>([])

  ngOnInit(): void {
 this.retrieveCategories()
}


retrieveCategories(){
  this.category_Service.getAllCategories().subscribe({next:(res)=>{
    this.categories.set(res)
    console.log("respuesta ",res);
    
  }})
}
onChangeCategory(category_name:string){
  console.log('1233');
  
this.product_Service.getAllProducts().subscribe({next:(res:Product[])=>{
  
if (category_name!='all') {
  this.product_Service.products.set(res.filter((product:Product)=>product.category===category_name))

}else{this.product_Service.products.set(res)}
}})
}
onLogout(){
  this.user_service.logout()
}
}
