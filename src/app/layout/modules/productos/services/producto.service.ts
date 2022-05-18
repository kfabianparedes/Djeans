import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private _url: string = environment.url;

    constructor(private http: HttpClient) { }

    public listarProductos() : Observable<Respuesta>{
        const url  = `${ this._url }/productos/`;
        return this.http.get<Respuesta>( url )
        .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
        );
    }

    public registrarProductos(producto: Producto): Observable<Respuesta>{
        const url  = `${ this._url }/productos/`;
        const body = {

        prod_codigo: producto.prod_codigo.toUpperCase(),
        prod_descripcion: producto.prod_descripcion.toUpperCase(),
        prod_precio_compra_base: producto.prod_precio_compra_base,
        prod_precio_compra: producto.prod_precio_compra,
        prod_precio_venta_base: producto.prod_precio_venta_base,
        prod_precio_venta: producto.prod_precio_venta,
        prod_descuento_promocion: producto.prod_descuento_promocion,
        proveedor: producto.proveedor,
        talla: producto.talla,
        categoria: producto.categoria,
        marca: producto.marca,
        modelo: producto.modelo,
        color: producto.color,
        prod_estado : true
        }
        return this.http.post<Respuesta>( url, body )
        .pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=>err))
        );
    }

    public actualizarProductos(producto: Producto): Observable<Respuesta>{
        const url  = `${ this._url }/productos/${producto.prod_id}/`;
        const body = {
        prod_id: producto.prod_id,
        prod_codigo: producto.prod_codigo.toUpperCase(),
        prod_descripcion: producto.prod_descripcion.toUpperCase(),
        prod_precio_compra_base: producto.prod_precio_compra_base,
        prod_precio_compra: producto.prod_precio_compra,
        prod_precio_venta_base: producto.prod_precio_venta_base,
        prod_precio_venta: producto.prod_precio_venta,
        prod_descuento_promocion: producto.prod_descuento_promocion,
        proveedor: producto.proveedor,
        talla: producto.talla,
        categoria: producto.categoria,
        marca: producto.marca,
        modelo: producto.modelo,
        color: producto.color,
        prod_estado : producto.prod_estado
        }
        return this.http.put<Respuesta>( url, body )
        .pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=>err))
        );
    }


    public eliminarProducto(idProducto: number): Observable<Respuesta>{
        const url  = `${ this._url }/productos/${idProducto}/`;
        return this.http.delete<Respuesta>( url )
            .pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=>err))
            );
        }
}