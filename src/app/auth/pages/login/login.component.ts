import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
      .subscribe( success => {
        if ( success === true ) {
          this.router.navigateByUrl('/layout');
        } else {
          Swal.fire('Error', 'Hubo un error al autorizarse', 'error');
        }
      });
  }
}
