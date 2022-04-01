import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from '../../models/respuesta.model';
import { errorAlerta, exitoAlerta, validarCodigosDeErrorDelAPI } from '../../utils/reutilizables'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() activarSideBar = new EventEmitter<boolean>();
  private _esconder: boolean = false;
  public username: string = '';
  constructor(
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.username = this.authService.decode(localStorage.getItem('USU_USERNAME')!)
  }

  estadoSideBar():void{
    this._esconder===true?
      this._esconder = false:
      this._esconder = true;
    this.activarSideBar.emit(this._esconder);
  }

  logout(): void{
    this.authService.logout().
    subscribe(
      {
        next: (respuesta:Respuesta) => {
          if ( respuesta.success === true  && respuesta.code === 200){
            exitoAlerta('Hasta luego',respuesta.message);
            this.router.navigateByUrl('/');
          }
        },  

        error: (respuesta:HttpErrorResponse) => {
          if(respuesta.status !== 0){
            if(validarCodigosDeErrorDelAPI(respuesta.error['code']))
              errorAlerta(respuesta.error['code'],respuesta.error.message);
              
          }else{
            errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor)
          }
        }

      }
    )
  }

}


