import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { validarCodigosDeErrorDelAPI, exitoAlerta, errorAlerta } from 'src/app/shared/models/reutilizables';
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

  constructor( 
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService
  ) { }


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
        error: (respuesta:HttpErrorResponse) => {
          if(respuesta.status !== 0){
            if(validarCodigosDeErrorDelAPI(respuesta.error['code'])){
              errorAlerta(respuesta.error['code'],respuesta.error.message);
            }
          }else{
            errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
          }
        }
      }
    )
  }
}
