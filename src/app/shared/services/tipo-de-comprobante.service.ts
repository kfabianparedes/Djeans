import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDeComprobanteService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarTipoDeComprobantes() : Observable<Respuesta>{
    const url  = `${ this._url }/tipos-de-comprobante/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
}
