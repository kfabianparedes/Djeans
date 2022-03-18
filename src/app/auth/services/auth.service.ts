import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly mensajeErrorDelServidor = 'Hubo un error de conexión en el servidor. Póngase en contacto con el administrador para obtener más información.';
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USU_ID = 'USU_ID';
  private readonly USU_USERNAME = 'USU_USERNAME';
  private _url: string = environment.url;
  private _autenticacion!: Token;

  get autenticacion(): Token {
    return { ...this._autenticacion };
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
          this._guardarRespuestaLogin(this.autenticacion) // usamos el getter
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
    localStorage.setItem(this.USU_ID, this.encode(info.id.toString()));
    localStorage.setItem(this.USU_USERNAME, this.encode(info.username));
  }
  private _guardarTokens(tokens: Token) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  public estaLogeado() {
    return !!this.getAccessToken();
  }

  public getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }
  

  public logout(): Observable<Respuesta> {
    const url  = `${ this._url }/logout`;
    const body = {
      "username": this.decode(localStorage.getItem(this.USU_USERNAME)!),
      "id": this.decode(localStorage.getItem(this.USU_ID)!)
    };
    return this.http.post<Respuesta>( url, body ).pipe(
      tap(() => this._desloguearUsuario()),
      map(respuesta => respuesta),
      catchError(err => throwError(()=>err))
    );
  }
  // private _getUserInfo(): void{
  //   this._username = localStorage.getItem('USU_ID') || '';
  //   this._id = Number(localStorage.getItem('USU_ID')) || 0;
  // }
  private _getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
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

  // b64EncodeUnicode("✓ à la mode"); // "JUUyJTlDJTkzJTIwJUMzJUEwJTIwbGElMjBtb2Rl"
  // UnicodeDecodeB64("JUUyJTlDJTkzJTIwJUMzJUEwJTIwbGElMjBtb2Rl"); // "✓ à la mode"

}
