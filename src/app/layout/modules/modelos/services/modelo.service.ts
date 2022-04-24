import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Modelo } from '../models/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarModelos() : Observable<Respuesta>{
    const url  = `${ this._url }/modelos/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public registrarModelo({mod_descripcion}: Modelo): Observable<Respuesta>{
    const url  = `${ this._url }/modelos/`;
    const body = {
      mod_descripcion: mod_descripcion.toUpperCase(),
      mod_estado : true
    }
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public actualizarModelo(modelo: Modelo): Observable<Respuesta>{
    const url  = `${ this._url }/modelos/${modelo.mod_id}/`;
    const body = {
      mod_id: modelo.mod_id,
      mod_descripcion: modelo.mod_descripcion.toUpperCase(),
      mod_estado : modelo.mod_estado
    }
    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarModelo(idModelo: number): Observable<Respuesta>{
    const url  = `${ this._url }/modelos/${idModelo}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
}
