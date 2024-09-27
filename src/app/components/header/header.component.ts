import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  category_Service=inject(CategoryService)
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
}
