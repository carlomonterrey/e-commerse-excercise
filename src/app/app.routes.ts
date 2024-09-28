import { Routes } from '@angular/router';
import { isloguedGuard } from './guards/islogued.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full',    title: 'Senfima',
}, // redirect to `login`
 /*  { path: "login", component: LoginComponent, pathMatch: "full",    title: 'Senfima',
}, */
{ path: 'login',
loadComponent:()=>import('./components/login/login.component').then(c=>c.LoginComponent)
 },
{ path: 'home',
canActivate:[isloguedGuard],
loadComponent:()=>import('./components/home/home.component').then(c=>c.HomeComponent),
children:[
 {path: '',loadComponent:()=>import('./components/products/products.component').then(c=>c.ProductsComponent),
}
]
 },
 { path: '**', component: LoginComponent },  


];
