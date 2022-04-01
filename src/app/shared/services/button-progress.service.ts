import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonProgressService {

  constructor() { }

  cargando = new Subject<boolean>();

  mostrar(): void {
    this.cargando.next(true);
  }

  ocultar(): void {
    this.cargando.next(false);
  }
}
