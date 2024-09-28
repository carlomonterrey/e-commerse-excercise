import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';

export const isloguedGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const user_service=inject(UserService)
 
  if (user_service.isLoggedIn()) {
    console.log(' logueado');

    return true
  }else{
console.log('no logueado');
  
  return router.createUrlTree(['/login']);
  }
};
