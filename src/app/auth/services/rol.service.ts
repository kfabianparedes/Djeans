import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Rol } from 'src/app/layout/modules/usuarios/utils/Roles.model';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _roles : Rol[] = [];
  private _url: string = environment.url;

  get roles(): Rol[] {
    return [...this._roles];
  }

  constructor(private http: HttpClient) { }

  public listarRoles() : Observable<Respuesta>{
    const url  = `${ this._url }/roles/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        tap(respuesta => {
          this._roles = [...respuesta.data];
          this._guardarRoles(this._roles);
        }),
        map((respuesta) => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public registrarRol({rol_tipo}: Rol): Observable<Respuesta>{
    const url  = `${ this._url }/roles/`;
    const body = {
      rol_tipo: rol_tipo.toUpperCase()
    }
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public obtenerRoles(): Rol[]{
    return this.roles || JSON.parse(this.decode(((localStorage.getItem('USU_ROLES')!)))) as Rol[];
  }

  private _guardarRoles(roles: Rol[]) {
    localStorage.setItem('USU_ROLES',this.encode(JSON.stringify(roles)));
  }
  
  public encode(valor:string) {
    return btoa(encodeURIComponent(valor));
  };

  public decode(valor:string) {
    return decodeURIComponent(atob(valor));
  };

}

