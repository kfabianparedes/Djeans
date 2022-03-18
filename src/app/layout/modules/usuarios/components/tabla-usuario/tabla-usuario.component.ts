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
  
  constructor() { }

  ngOnInit(): void {
  }


  public obtenerRolDeUsuario($user: Usuario):string[]{
    if ( $user.is_superuser === true){
      return ['success',Roles.superuser];
    }else if ($user.is_staff === true){
      return ['warning',Roles.admin];
    }else if ($user.is_employee === true){
      return ['primary',Roles.employee];
    }else
      return ['danger','SIN ROL'];
  }

  loading = [false, false, false, false]

  load(index: any) {
      this.loading[index] = true;
      setTimeout(() => this.loading[index] = false, 1000);
  }
}
