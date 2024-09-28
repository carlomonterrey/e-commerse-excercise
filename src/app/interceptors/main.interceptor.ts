import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
const authToken='1234567'
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  console.log(authToken);
  
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err); 
    })
  );};


  export const progresivebarInterceptor: HttpInterceptorFn = (req, next) => {
    const service=inject(AppService)
   // Verifica si la solicitud es POST, PATCH o DELETE
   const isGet = ['GET'].includes(req.method);
  
   if (isGet ) {
     service.showSpiner.set(true);   
   }
    return next(req).pipe(
      finalize(()=>{service.showSpiner.set(false)})
    );
  };
