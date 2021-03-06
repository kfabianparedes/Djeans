import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProgressbarService } from 'src/app/shared/services/progressbar.service';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _urlsExcluidas: string[];

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private progressbarService: ProgressbarService,
    private buttonProgressService: ButtonProgressService,
    ) {

    this._urlsExcluidas= [
      '/login',
    ];

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressbarService.mostrar();
    this.buttonProgressService.mostrar();
    if(this._esUrlValidaParaInterceptar(request.url)){
      if (this.authService.getAccessToken()) {
        request = this.addToken(request, this.authService.getAccessToken()!);
      }

      return next.handle(request).pipe(
        finalize(() => {
          this.progressbarService.ocultar(),
          this.buttonProgressService.ocultar();
        }),
        catchError((error:HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            if(!error.error['messages']){
              this.authService.removeTokens();
              errorAlerta(error.error['code'],'Debe renovar la sesión. Vuelva a autenticarse.');
              this.router.navigate(['/']);
              return throwError(()=>error);
            }
            return this.handle401Error(request, next);
            
          } else {
            return throwError(()=>error);
          }
        })
      );
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.progressbarService.ocultar(),
        this.buttonProgressService.ocultar();
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Token ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: Token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        }),
        finalize(() => {
          this.progressbarService.ocultar(),
          this.buttonProgressService.ocultar();
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((jwt: string) => {
          return next.handle(this.addToken(request, jwt));
        }),
        finalize(() => {
          this.progressbarService.ocultar(),
          this.buttonProgressService.ocultar();
        })
      );
    }
  }

  private _esUrlValidaParaInterceptar(requestUrl: string): boolean {
    const positionIndicator: string = `${environment.url}/`;
    const position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      const destination: string = requestUrl.substring(position + positionIndicator.length);
      for (let address of this._urlsExcluidas) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
