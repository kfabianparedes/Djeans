import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarCategorias() : Observable<Respuesta>{
    const url  = `${ this._url }/categorias/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public registrarCategoria({cat_descripcion}: Categoria): Observable<Respuesta>{
    const url  = `${ this._url }/categorias/`;
    const body = {
      cat_descripcion: cat_descripcion.toUpperCase(),
      cat_estado : true
    }
    return this.http.post<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public actualizarCategoria(categoria: Categoria): Observable<Respuesta>{
    const url  = `${ this._url }/categorias/${categoria.cat_id}/`;
    const body = {
      cat_id: categoria.cat_id,
      cat_descripcion: categoria.cat_descripcion.toUpperCase(),
      cat_estado : categoria.cat_estado
    }
    return this.http.put<Respuesta>( url, body )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }


  public eliminarCategoria(idCategoria: number): Observable<Respuesta>{
    const url  = `${ this._url }/categorias/${idCategoria}/`;
    return this.http.delete<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
}
