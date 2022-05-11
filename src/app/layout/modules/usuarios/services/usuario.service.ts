import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError} from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarUsuarios() : Observable<Respuesta>{
    const url  = `${ this._url }/usuarios/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public registrarUsuario({username, password, rol}: Usuario): Observable<Respuesta>{
    const url  = `${ this._url }/usuarios/`;
    const body = {
      username: username,
      password : password,
      rol: rol
    }
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public actualizarUsuario({id, username, is_active, rol}: Usuario): Observable<Respuesta>{
    const url  = `${ this._url }/usuarios/${id}/`;
    const body = {
      id: id,
      username: username,
      is_active: is_active,
      rol: rol
    }

    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarUsuario(idUsuario: number): Observable<Respuesta>{
    const url  = `${ this._url }/usuarios/${idUsuario}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
}
