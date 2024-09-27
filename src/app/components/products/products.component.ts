import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

products=signal<any[]>([])
product_service=inject(ProductService)

ngOnInit(): void {
  this.retrieveProducts()
}


retrieveProducts(){
  this.product_service.getAllProducts().subscribe({next:(res)=>{
    console.log(res);
    
    this.products.set(res)
  }})
}
}
