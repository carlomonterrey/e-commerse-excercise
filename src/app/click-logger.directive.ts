import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]',
  standalone: true
})
export class ClickLoggerDirective {

  constructor() { }


  @HostListener('click', ['$event']) 
  onClick(event: Event): void {
    console.log('Elemento clickeado:', event); 
  }
}
