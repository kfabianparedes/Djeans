import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Talla } from '../models/talla.models';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

    private _url: string = environment.url; 

    constructor(private http: HttpClient){}

    public listarTallas() : Observable<Respuesta>{
        const url = `${ this._url }/tallas/`;
        return this.http.get<Respuesta>(url)
            .pipe(
                map(respuesta=>respuesta),
                catchError(err => throwError(()=>err))
            )
    }

    public registrarTalla({tal_descripcion}:Talla) : Observable<Respuesta>{
        const url = `${ this._url }/tallas/`;
        const body = {
            tal_descripcion : tal_descripcion.toUpperCase(),
            tal_estado : true
        }
        return this.http.post<Respuesta>(url,body)
            .pipe(
                map(respuesta => respuesta),
                catchError(err => throwError(()=>err))
            )
    }

    public actualizarTalla(talla:Talla) : Observable<Respuesta>{
        const url = `${ this._url }/tallas/${ talla.tal_id }/`;
        const body = {
            tal_id : talla.tal_id,
            tal_descripcion : talla.tal_descripcion.toUpperCase(),
            tal_estado : talla.tal_estado
        }
        return this.http.put<Respuesta>(url,body)
            .pipe(
                map(respuesta => respuesta),
                catchError(err => throwError(()=>err))
            )
    }

    public eliminarTalla(idTalla: number ) : Observable<Respuesta>{
        const url  = `${ this._url }/tallas/${ idTalla }/`;
        return this.http.delete<Respuesta>(url)
            .pipe(
                map(respuesta=>respuesta),
                catchError(err => throwError(()=>err))
            )
    }
}