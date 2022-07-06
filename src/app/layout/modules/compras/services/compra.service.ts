import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra.model';
import { GuiaRemisionDTO } from '../utils/guia-remision-dto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }
  
  public registrarUsuario( compra : Compra, detallesDeCompra: DetalleDeCompra[], guiaDeRemision?: GuiaRemisionDTO): Observable<Respuesta>{
    const url  = `${ this._url }/compras/`;
    console.log('COMPRA');
    console.log(compra);
    const body = {
      compra: {
        comp_importe_total: compra.comp_importe_total,
        comp_fecha_emision: compra.comp_fecha_emision,
        comp_serie: compra.comp_serie,
        comp_numero: compra.comp_numero,
        usuario: compra.usuario,
        proveedor: compra.proveedor,
        tipo_comprobante: compra.tipo_comprobante
      },
      detalles: detallesDeCompra,
      guia_remision: {
        guia_serie: guiaDeRemision?.serieDePago,
        guia_numero: guiaDeRemision?.numeroDePago,
        guia_fecha: guiaDeRemision?.fechaDeEmision
      }
    }
    console.log('BODY');
    console.log(body);
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
} 
