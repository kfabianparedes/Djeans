import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Rol } from 'src/app/layout/modules/usuarios/utils/Roles.model';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarRoles() : Observable<Respuesta>{
    const url  = `${ this._url }/roles/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
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


}
