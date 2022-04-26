import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Sucursal } from '../models/sucursal.model';


@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private _url:string =environment.url;
  constructor(private http:HttpClient) { }

  public listarSucursales():Observable<Respuesta>{
    const url=`${ this._url }/sucursales/`;
    return this.http.get<Respuesta>(url)
    .pipe(
      map(respuesta=>respuesta),
      catchError(err=>throwError(()=>err))
    );
  }

  public registrarSucursal({suc_nombre,suc_direccion}:Sucursal):Observable<Respuesta>{
    const url  = `${ this._url }/sucursales/`;
    const body={
      suc_nombre:suc_nombre.toUpperCase(),
      suc_direccion:suc_direccion.toUpperCase(),
      suc_estado:true
    }
    return this.http.post<Respuesta>(url,body)
    .pipe(
      map(respuesta=>respuesta),
      catchError(err=>throwError(()=>err))
    );
  }

  public actualizarSucursal(sucursal: Sucursal): Observable<Respuesta>{
    const url  = `${ this._url }/sucursales/${sucursal.suc_id}/`;
    const body = {
      suc_id        : sucursal.suc_id,
      suc_nombre     : sucursal.suc_nombre.toUpperCase(),
      suc_direccion : sucursal.suc_direccion.toUpperCase(),
      suc_estado    : sucursal.suc_estado
    }
    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarSucursal(idSucursal: number): Observable<Respuesta>{
    const url  = `${ this._url }/sucursales/${idSucursal}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

}

