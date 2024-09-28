import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { UserLogin } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { API_URL } from '../app.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoged=signal(false)

  constructor(private http:HttpClient,private router:Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  login(user: UserLogin): Observable<any> {
    
    return this.http.post(`${API_URL}auth/login`, user);
  }

  saveToken(token:string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); 
      localStorage.setItem('token', token); 
      this.isLoged.set(true)
    }
   
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {

    localStorage.clear()
    this.router.navigateByUrl('/login'); }

  }
  isLoggedIn(){
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        return true
      }
    }
    return false

  }
}
