import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RolService } from 'src/app/auth/services/rol.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { errorAlerta, validarCodigosDeErrorDelAPI } from 'src/app/shared/utils/reutilizables';
import { DataUsuarioRegistroActualizar } from '../../models/registro-actualizar-usuario.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Rol, Roles } from '../../utils/Roles.model';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css'],
  providers: [MessageService]
})
export class HomeUsuarioComponent implements OnInit{

  public usuarios: Usuario[] = [];
  public mostrarModal: boolean = false;
  public tituloModal: string = '';
  public usuarioParaActualizar: Usuario = {} as Usuario;

  public roles: Rol[] = [];


  constructor(
    private usuarioService:UsuarioService,
    public messageService: MessageService,
    private _rolService: RolService,
    public rolPermissionService: RolPermissionService
    ) {
      
    }

  ngOnInit(): void {
    // this.obtenerInfoUsuarioLogeado();
    this._listarRoles();
    this._listarUsuarios();

  }
  
  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarUsuarios(): void{
    this.usuarios = [];
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

  public eliminarUsuario(idUsuario : number){
    this.usuarioService.eliminarUsuario(idUsuario).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Excelente', 
            detail: respuesta.message
          });
          
          this._listarUsuarios();
        },
        error: (respuestaError:HttpErrorResponse) => {
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
      }
    );

  }

  private _registrarUsuario(usuario : Usuario): void {
    
    this.usuarioService.registrarUsuario(usuario).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          
          this._listarUsuarios();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error', 
              summary: `Código de error: ${respuesta.code}`, 
              detail: respuesta.message
            });
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  private _actualizarUsuario(usuario : Usuario): void {
    this.usuarioService.actualizarUsuario(usuario).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizado...', 
            detail: respuesta.message
          });
          
          this._listarUsuarios();
        },
        error: (respuestaError:HttpErrorResponse) => {
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
      }
    );
  }

  public guardarUsuario({esRegistro, usuario}: DataUsuarioRegistroActualizar ): void {
    if( esRegistro ){
      this._registrarUsuario(usuario);
    }else{
      this._actualizarUsuario(usuario);
    }
  }

  private _obtenerRolDeUsuario(user: Usuario):string{
    let tipoDeUsuario = 'SIN ROL';
    this.roles.forEach((rol)=>{
      if(rol.rol_id == user.rol)
        tipoDeUsuario = rol.rol_tipo;
    });
    return tipoDeUsuario;
  }

  public guardarTituloModal(tituloDelModal : string): void {
    this.tituloModal= tituloDelModal;
  }

  public modificarEstadoModal(estadoModal: boolean): void {
    this.mostrarModal = estadoModal;
  }

  public guardarUsuarioParaActualizar( usuario: Usuario): void { 
    this.usuarioParaActualizar = {...usuario};
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
