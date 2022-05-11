import { Injectable } from '@angular/core';
import { ROL_ADMINISTRADOR, ROL_EMPLEADO, ROL_NONE, ROL_SUPERUSER } from 'src/app/layout/modules/usuarios/utils/Roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolPermissionService {

  private _ROL_USER = {
    su : this.encode(ROL_SUPERUSER),
    ad : this.encode(ROL_ADMINISTRADOR),
    em : this.encode(ROL_EMPLEADO),
    none: this.encode(ROL_NONE)
  }

  get ROL_USER() {
    return {...this._ROL_USER}
  }

  public encode(valor:string) {
    return btoa(encodeURIComponent(valor));
  };

  public decode(valor:string) {
    return decodeURIComponent(atob(valor));
  };
  
  constructor() { }
}
