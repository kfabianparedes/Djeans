import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean | Observable<boolean>{
    return this.canLoad();
  }

  canLoad(): boolean | Observable<boolean>{
    if (!this.authService.estaLogeado()) {
      this.router.navigate(['/']);
    }
    return this.authService.estaLogeado();
  }
}
