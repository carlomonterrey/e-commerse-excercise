import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
}

export const API_URL = environment.apiUrl;
