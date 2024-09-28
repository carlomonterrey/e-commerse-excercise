import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { UserLogin } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { API_URL } from '../app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoged=signal(false)

  constructor(private http:HttpClient,private router:Router) { }

  login(user: UserLogin): Observable<any> {
    
    return this.http.post(`${API_URL}auth/login`, user);
  }

  saveToken(token:string){
    localStorage.removeItem('token'); 
    localStorage.setItem('token', token); 
    this.isLoged.set(true)
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/login'); 

  }
}
