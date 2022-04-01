import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta, validarCodigosDeErrorDelAPI } from 'src/app/shared/utils/reutilizables';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Roles } from '../../utils/Roles.model';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit , OnDestroy{


  public usuarios : Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }
  

  ngOnInit(): void {
    this._listarUsuarios();
  }

  ngOnDestroy(): void {
    // this.usuarioService.unsubscribe();
  }

  private _listarUsuarios(): void{
    this.usuarioService.listarUsuarios().subscribe({
      next: (respuesta: Respuesta)=>{
        (respuesta.data).forEach((usuario: Usuario) => {
          this.usuarios.push({
            ...usuario, 
            tipoDeUsuario: this._obtenerRolDeUsuario(usuario), 
            estaActivo: usuario.is_active?'ACTIVO':'INACTIVO'
          })
        });
      },
      error: (respuesta:HttpErrorResponse) => {
        if(respuesta.status !== 0){
          if(validarCodigosDeErrorDelAPI(respuesta.error['code']))
            errorAlerta(respuesta.error['code'],respuesta.error.message)
        }else{
          errorAlerta('Error en el servidor', AuthService.mensajeErrorDelServidor)
        }
      }

    });
  }

  private _obtenerRolDeUsuario(user: Usuario):string{
    return user.is_superuser? Roles.superuser:
                                user.is_staff?
                                  Roles.admin:
                                  user.is_employee?
                                    Roles.employee:
                                    Roles.noRol;
  }
}
