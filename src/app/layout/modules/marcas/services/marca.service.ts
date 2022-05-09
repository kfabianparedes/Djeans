import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarMarcas() : Observable<Respuesta>{
    const url  = `${ this._url }/marcas/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public registrarMarca({mar_descripcion}: Marca): Observable<Respuesta>{
    const url  = `${ this._url }/marcas/`;
    const body = {
      mar_descripcion: mar_descripcion.toUpperCase(),
      mar_estado : true
    }
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public actualizarMarca(marca: Marca): Observable<Respuesta>{
    const url  = `${ this._url }/marcas/${marca.mar_id}/`;
    const body = {
      mar_id: marca.mar_id,
      mar_descripcion: marca.mar_descripcion.toUpperCase(),
      mar_estado : marca.mar_estado
    }
    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarMarca(idMarca: number): Observable<Respuesta>{
    const url  = `${ this._url }/marcas/${idMarca}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
}
