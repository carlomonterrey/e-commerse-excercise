import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full',    title: 'Senfima',
}, // redirect to `login`
 /*  { path: "login", component: LoginComponent, pathMatch: "full",    title: 'Senfima',
}, */
{ path: 'login',
loadComponent:()=>import('./components/login/login.component').then(c=>c.LoginComponent)
 },
{ path: 'home',
loadComponent:()=>import('./components/home/home.component').then(c=>c.HomeComponent),
children:[
 {path: '',loadComponent:()=>import('./components/products/products.component').then(c=>c.ProductsComponent),
}
]
 },

];
