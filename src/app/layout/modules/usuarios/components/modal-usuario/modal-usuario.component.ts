import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {
  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Output() cerrarModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.cerrarModal.emit(false);
  }

  public guardarUsuario(): void {
    
  }
}
