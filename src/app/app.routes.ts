import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full',    title: 'Senfima',
}, // redirect to `login`
 /*  { path: "login", component: LoginComponent, pathMatch: "full",    title: 'Senfima',
}, */
{ path: 'home',
loadComponent:()=>import('./components/products/products.component').then(c=>c.ProductsComponent)
 },

];
