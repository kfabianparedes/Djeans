import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Roles } from '../../utils/Roles.model';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuarios: Usuario[] = [];
  public mostrarModal: boolean = false;
  public filtroBusquedaUsuario: string = '';
  constructor() { }

  ngOnInit(): void {
  }


  public obtenerColorDelRolDeUsuario(tipoDeUsuario: string):string{
    return tipoDeUsuario == Roles.superuser?
      'warning':tipoDeUsuario == Roles.admin?
      'success':tipoDeUsuario == Roles.employee?
      'primary':'danger';

  }

  public abrirModalCrearUsuario():void {
    this.mostrarModal = true;
  }


}
