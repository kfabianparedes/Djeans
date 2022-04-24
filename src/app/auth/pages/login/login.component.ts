import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { exitoAlerta, errorAlerta } from 'src/app/shared/utils/reutilizables';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginFormulario: FormGroup = this.fb.group({
    username:    ['kfabianparedes', [ Validators.required]],
    password: ['010199Kf_', [ Validators.required]],
  });
  
  public cargando : Subject<boolean> = this.buttonProgressService.cargando;

  constructor( 
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService,
    private buttonProgressService: ButtonProgressService
  ) { 
    localStorage.clear();
  }


  public login():void {
    const { username, password } = this.loginFormulario.value;
    this.authService.login( username, password )
    .subscribe(
      {
        next: (respuesta:Respuesta) => {
          if ( respuesta.success === true  && respuesta.code === 200){
            exitoAlerta('Bienvenido', respuesta.message);
            this.router.navigateByUrl('/layout');
          }
        },  
        error: (respuestaError:HttpErrorResponse) => {
          console.log(respuestaError);
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;

          if(codigoHttp !== 0){
            errorAlerta( respuesta.code.toString() , respuesta.message );
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
          
      }
    );
  }
}
