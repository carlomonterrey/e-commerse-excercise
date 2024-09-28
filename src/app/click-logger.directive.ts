import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]',
  standalone: true
})
export class ClickLoggerDirective {

  constructor() { }


  @HostListener('click', ['$event']) // Escucha el evento de clic
  onClick(event: Event): void {
    console.log('Elemento clickeado:', event); // Muestra un mensaje en la consola
    // Aquí puedes realizar cualquier otra acción que desees
  }
}
