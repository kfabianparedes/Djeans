import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RolService } from 'src/app/auth/services/rol.service';
import { Usuario } from 'src/app/layout/modules/usuarios/models/usuario.model';
import { Rol, ROLE_TYPES } from 'src/app/layout/modules/usuarios/utils/Roles.model';
import { RolPermissionService } from '../services/rol-permission.service';

@Directive({
  selector: '[appRol]'
})
export class RolDirective implements OnInit{
  private _usuarioActual!:Usuario;
  private permisos!: Array<string>;
  

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _authService: AuthService,
    private _rolPermission: RolPermissionService,
    
  ) { }

  ngOnInit(): void {
    this._usuarioActual = this._authService.getUserInfo();
    this.actualizarVista();
  }

  @Input()
  set appRol(permisos: string[]){
    this.permisos = permisos;
  }
  
  public actualizarVista(): void{
    this._viewContainer.clear();
    if( this.comprobarPermiso() ){
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }

  public comprobarPermiso(): boolean {
    let tienePermiso = false;
    if(this._usuarioActual){
        const usuarioPermitido = this.permisos.find((permiso:string)=>{
          const tipoDeRol = this._usuarioActual.tipoRol;
          return (this._rolPermission.decode(permiso).toUpperCase() === tipoDeRol?.toUpperCase())
        })

        if(usuarioPermitido){
          tienePermiso = true;
        }
      }
    return tienePermiso;
  }
}
