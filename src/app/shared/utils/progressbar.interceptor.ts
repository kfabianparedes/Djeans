import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ProgressbarService } from '../services/progressbar.service';

@Injectable()
export class ProgressbarInterceptor implements HttpInterceptor {

  constructor(public progressbarService: ProgressbarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressbarService.mostrar();
    return next.handle(request).pipe(
        finalize(() => this.progressbarService.ocultar())
    );
  }
}
