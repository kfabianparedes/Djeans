import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Usuario } from 'src/app/layout/modules/usuarios/models/usuario.model';
import { ACCESS_TOKEN, REFRESH_TOKEN,USU_ID,USU_USERNAME, USU_ROLE, TYPE_ROLE } from 'src/app/layout/modules/usuarios/utils/Roles.model';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly mensajeErrorDelServidor = 'Hubo un error de conexión en el servidor. Póngase en contacto con el administrador para obtener más información.';

  private _url: string = environment.url;
  private _autenticacion!: Token;
  private _userData : Usuario = {} as Usuario;

  get autenticacion(): Token {
    return { ...this._autenticacion };
  }

  get userData(): Usuario {
    return {...this._userData};
  }
  constructor(private http: HttpClient) { }

  public login( username: string, password: string ) : Observable<Respuesta>{
    const url  = `${ this._url }/login`;
    const body = { username, password };
    return this.http.post<Respuesta>( url, body )
      .pipe(
        tap(respuesta => {
          this._autenticacion = {...respuesta.data}
          this._guardarInfoUsuario(this._autenticacion);
          this._guardarRespuestaLogin(this.autenticacion);
        }),
        map(respuesta => respuesta),
        catchError(err => throwError(()=>err))
      );
  }
  //  https://www.youtube.com/watch?v=F1GUjHPpCLA

  private _guardarRespuestaLogin(tokens: Token) {
    this._guardarTokens(tokens);
  }
  
  private _guardarInfoUsuario(info: Token){
    this._userData.id = info.id;
    this._userData.username = info.username;
    this._userData.rol = info.rol;
    this._userData.tipoRol = info.tipoRol;
    localStorage.setItem(USU_ID, this.encode(info.id.toString()));
    localStorage.setItem(USU_USERNAME, this.encode(info.username));
    localStorage.setItem(USU_ROLE, this.encode(info.rol.toString()));
    localStorage.setItem(TYPE_ROLE, this.encode(info.tipoRol));
  }

  private _guardarTokens(tokens: Token) {
    localStorage.setItem(ACCESS_TOKEN, tokens.access);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh);
  }

  public estaLogeado() {
    return !!this.getAccessToken();
  }

  public getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  

  public logout(): Observable<Respuesta> {
    const url  = `${ this._url }/logout`;
    const body = {
      username: this._userData.username || this.decode(localStorage.getItem(USU_USERNAME)!),
      id: this.userData.id || +this.decode(localStorage.getItem(USU_ID)!)
    };
    return this.http.post<Respuesta>( url, body ).pipe(
      tap(() => this._desloguearUsuario()),
      map(respuesta => respuesta),
      catchError(err => throwError(()=>err))
    );
  }
  
  private _getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public getUserInfo(): Usuario {
    const usuarioInfo : Usuario = {
      id: this.userData.id || +this.decode(localStorage.getItem(USU_ID)!), 
      username: this.userData.username || this.decode(localStorage.getItem(USU_USERNAME)!),
      rol: this.userData.rol || +this.decode(localStorage.getItem(USU_ROLE)!),
      is_active: this.userData.is_superuser || Boolean(this.decode(localStorage.getItem(USU_ROLE)!)),
      tipoRol: this.userData.tipoRol || this.decode(localStorage.getItem(TYPE_ROLE)!)
    }
    return usuarioInfo;
  }

  private _desloguearUsuario() {
    this._autenticacion =  {} as Token;
    this.removeTokens();
  }

  public removeTokens() {
    localStorage.clear();
  }

  public refreshToken():Observable<Token> {
    const url  = `${ this._url }/api/token/refresh/`;
    const body = {"refresh": this._getRefreshToken()};
    return this.http.post<Token>(url,body).pipe(tap((auth: Token) => this._guardarTokens(auth)));//,retry(2));
  }

  public encode(valor:string) {
    return btoa(encodeURIComponent(valor));
  };

  public decode(valor:string) {
    return decodeURIComponent(atob(valor));
  };

}
