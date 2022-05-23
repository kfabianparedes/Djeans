import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { RolService } from '../auth/services/rol.service';
import { Respuesta } from '../shared/models/respuesta.model';
import { errorAlerta } from '../shared/utils/reutilizables';
import { Rol } from './modules/usuarios/utils/Roles.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [MessageService]
})
export class LayoutComponent implements OnInit {
  private roles: Rol[] = [];

  claseEsconderSideBar: string = '';
  messageService: any;
  constructor(private _rolService: RolService) { }

  ngOnInit(): void {
    console.log(window.innerWidth);
    this._listarRoles();
  }
  verificarEstadoSideBar(event:boolean):void{
    event===true?this.claseEsconderSideBar='sb-sidenav-toggled':this.claseEsconderSideBar=''
  }

  private _listarRoles(): void{
    this.roles = [];
    this._rolService.listarRoles().subscribe({
      next: (respuesta: Respuesta)=>{
        (respuesta.data).forEach((rol: Rol) => {
          this.roles.push({...rol})
        });
      },
      error: ( respuestaError : HttpErrorResponse ) => {
        const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            codigoHttp===403?
              errorAlerta(`${respuesta.code}`, respuesta.message ):
              this.messageService.add({
                severity:'error', 
                summary: `Código de error: ${respuesta.code}`, 
                detail: respuesta.message
              });
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
      }
    });
  }
}
