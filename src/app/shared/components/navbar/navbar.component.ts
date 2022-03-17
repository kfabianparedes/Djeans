import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Respuesta } from '../../models/respuesta.model';
import { errorAlerta, exitoAlerta, validarCodigosDeErrorDelAPI } from '../../models/reutilizables';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() activarSideBar = new EventEmitter<boolean>();
  esconder: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
  }

  estadoSideBar():void{
    this.esconder===true?
      this.esconder = false:
      this.esconder = true;
    this.activarSideBar.emit(this.esconder);
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


