import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError} from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _url: string = environment.url;

  constructor(private http: HttpClient) { }

  public listarUsuarios() : Observable<Respuesta>{
    const url  = `${ this._url }/usuarios/`;
    return this.http.get<Respuesta>( url )
      .pipe(
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }

  public eliminarUsuario(){
    
  }

}
