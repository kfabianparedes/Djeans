import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Compra } from 'src/app/layout/modules/compras/models/compra.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteCompraService {

    private _url: string = environment.url;

    constructor(private http: HttpClient) { }

    public listarCompras() : Observable<Respuesta>{
        const url = `${ this._url }/compras/`;
        return this.http.get<Respuesta>(url)
        .pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=>err))
        )
    }

    public listarComprasConFiltroDeFecha(fechaInicio : string, fechaFin : string) : Observable<Respuesta>{
        const url =  `${ this._url }/reporte-compras/?fechaIni=${fechaInicio}&fechaFin=${fechaFin}`;
        return this.http.get<Respuesta>(url)
        .pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=>err))
        )
    }
    // public listarProveedores() : Observable<Respuesta>{
    //     const url  = `${ this._url }/proveedores/`;
    //     return this.http.get<Respuesta>( url )
    //     .pipe(
    //     map(respuesta => respuesta),
    //     catchError(err => throwError(()=>err))
    //     );
    // }

    // public actualizarProveedor(proveedor: Proveedor): Observable<Respuesta>{
    //     const url  = `${ this._url }/proveedores/${proveedor.pro_id}/`;
    //     const body = {
    //         pro_id : proveedor.pro_id,
    //         pro_ruc: proveedor.pro_ruc.toUpperCase(),
    //         pro_nombre: proveedor.pro_nombre.toUpperCase(),
    //         pro_razon_social: proveedor.pro_razon_social.toUpperCase(),
    //         pro_email: proveedor.pro_email.toUpperCase(),
    //         pro_telefono1: proveedor.pro_telefono1.toUpperCase(),
    //         pro_telefono2: proveedor.pro_telefono2.toUpperCase(),
    //         pro_direccion1: proveedor.pro_direccion1.toUpperCase(),
    //         pro_direccion2: proveedor.pro_direccion2.toUpperCase(),
    //         pro_estado : proveedor.pro_estado
    //         }
    //     return this.http.put<Respuesta>( url, body )
    //     .pipe(
    //         map(respuesta => respuesta),
    //         catchError(err => throwError(()=>err))
    //     );
    // }


    // public eliminarProveedor(idProveedor: number): Observable<Respuesta>{
    // const url  = `${ this._url }/proveedores/${idProveedor}/`;
    // return this.http.delete<Respuesta>( url )
    //     .pipe(
    //     map(respuesta => respuesta),
    //     catchError(err => throwError(()=>err))
    //     );
    // }
}
