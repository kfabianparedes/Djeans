import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { validarCodigosDeErrorDelAPI, errorAlerta } from 'src/app/shared/models/reutilizables';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

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
        this.usuarios = [...respuesta.data];
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

}
