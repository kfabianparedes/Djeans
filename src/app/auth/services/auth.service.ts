import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Respuesta } from 'src/app/shared/interfaces/respuesta.model';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url: string = environment.url;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private http: HttpClient) { }

  login( username: string, password: string ){
    const url  = `${ this._url }/login`;
    const body = { username, password };
    return this.http.post<Respuesta>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.success ) {
            localStorage.setItem('access-token', resp.data['token']! );
            localStorage.setItem('refresh-token', resp.data['refresh_token']! );
            localStorage.setItem('user-id', resp.data['id']! );
            localStorage.setItem('username', resp.data['username']! );
          }
        }),
        map( resp => resp ),
        catchError( err => err['message'] )
      );
  }

  validarToken(): Observable<boolean> {

    const url = `${ this._url }/auth/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('access-token') || '' );

    return this.http.get<Respuesta>( url, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('access-token', resp.data['token']! );
            this._usuario = { // faltaaaaa
              username: resp.data['username']!,
              id: resp.data['id']!,
              is_active: resp.data['is_active']!,
              is_employee: resp.data['is_employee']!,
              is_staff: resp.data['is_staff']!,
              is_superuser: resp.data['is_superuser']!
            }

            return resp.success;
          }),
          catchError( err => of(false) )
        );

  }

  logout() {
    localStorage.clear();
  }
}
