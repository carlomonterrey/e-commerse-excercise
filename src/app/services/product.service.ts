import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { API_URL } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
    // Este servicio ahora puede hacer solicitudes HTTP a través de `this.http`.
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${API_URL}/products`); 
  }
}
