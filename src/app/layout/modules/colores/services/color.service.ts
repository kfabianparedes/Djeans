import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

    private _url: string = environment.url; 

    constructor(private http: HttpClient){}

    public listarColores() : Observable<Respuesta>{

        const url = `${ this._url }/colores/` ; 

        return this.http.get<Respuesta>(url).pipe(
            map(respuesta => respuesta), 
            catchError(err => throwError(()=> err))
        );

    }

    public registrarColor({col_descripcion}:Color) : Observable<Respuesta>{

        const url = `${ this._url }/colores/` ;

        const body = {
            col_descripcion : col_descripcion, 
            col_estado : true
        }

        return this.http.post<Respuesta>(url,body).pipe(
            map(respuesta => respuesta),
            catchError(err => throwError(()=> err))
        )
    }

    public actualizarColor(color: Color) : Observable<Respuesta> {
        const url = `${ this._url }/colores/${ color.col_id }/`; 
        const body = {
            col_id : color.col_id,
            col_descripciom : color.col_descripcion.toUpperCase(),
            col_estado : color.col_estado
        }

        return this.http.put<Respuesta>( url , body ). pipe(
            map(respuesta => respuesta), 
            catchError(err => throwError(()=>err))
        )
    }

    public eliminarColor(col_id : number ) : Observable<Respuesta> {
        const url = `${ this._url }/colores/${ col_id }/` ;

        return this.http.delete<Respuesta>( url ).pipe(
            map(respuesta => respuesta), 
            catchError(err => throwError(() => err))
        )
    }

}