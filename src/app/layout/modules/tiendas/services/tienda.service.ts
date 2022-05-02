import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Tienda } from '../models/tienda.models';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private _url:string =environment.url;
  constructor(private http:HttpClient) { }

  public listarTiendas():Observable<Respuesta>{
    const url=`${ this._url }/tiendas/`;
    return this.http.get<Respuesta>(url)
    .pipe(
      map(respuesta=>respuesta),
      catchError(err=>throwError(()=>err))
    );
  }

  public registrarTienda({tie_nombre}:Tienda):Observable<Respuesta>{
    const url  = `${ this._url }/tiendas/`;
    const body={
      tie_nombre:tie_nombre.toUpperCase(),
      tie_estado:true
    }
    return this.http.post<Respuesta>(url,body)
    .pipe(
      map(respuesta=>respuesta),
      catchError(err=>throwError(()=>err))
    );
  }

  public actualizarTienda(tienda: Tienda): Observable<Respuesta>{
    const url  = `${ this._url }/tiendas/${tienda.tie_id}/`;
    const body = {
      tie_id        : tienda.tie_id,
      tie_nombre    : tienda.tie_nombre.toUpperCase(),
      tie_suc_id    : tienda.tie_suc_id,
      tie_estado    : tienda.tie_estado
    }
    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarTienda(idTienda: number): Observable<Respuesta>{
    const url  = `${ this._url }/tiendas/${idTienda}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

}
