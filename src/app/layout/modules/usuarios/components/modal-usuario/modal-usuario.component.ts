import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { validarCaracteresAlfabeticosConEspacios, validarCaracteresAlfanumericosConEspaciosMasSimbolos } from 'src/app/shared/utils/reutilizables';
import { DataUsuarioRegistroActualizar } from '../../models/registro-actualizar-usuario.model';
import { Usuario } from '../../models/usuario.model';
import { Rol, Roles } from '../../utils/Roles.model';

@Component({
  selector: 'modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {
  @Input() roles : Rol[] = [];
  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() usuarioUtilizadoEnModal! : Usuario;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionUsuario = new EventEmitter<DataUsuarioRegistroActualizar>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public esRegistro : boolean = true;
  
  public usuarioFormulario: FormGroup = this.fb.group({
    username: ['', [  Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(50),
                        Validators.pattern(validarCaracteresAlfabeticosConEspacios)]],
    password: ['', [ Validators.required,Validators.minLength(8),Validators.maxLength(50) ]],
    is_active: [true, [ Validators.required]],
    rol: ['', Validators.required ]
  });

  private _datosIniciales = {
    username: '',
    password: '',
    is_active: true,
    rol: ''
  };
  constructor(
    private fb: FormBuilder,
    public _buttonProgressService: ButtonProgressService
  ) { }

  get username() {
    return this.usuarioFormulario.get('username');
  }

  get password() {
    return this.usuarioFormulario.get('password');
  }

  get is_active() {
    return this.usuarioFormulario.get('is_active');
  }

  get rol() {
    return this.usuarioFormulario.get('rol');
  }

  private _actualizarValidacionesPassword(){
    if(!this.esRegistro){
      this.usuarioFormulario.get('password')?.clearValidators();
      this.usuarioFormulario.get('password')?.updateValueAndValidity();
    }else{
      this.usuarioFormulario.get('password')?.setValidators([Validators.required,Validators.minLength(8),Validators.maxLength(50)]);
      this.usuarioFormulario.get('password')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public closeModal(): void {
    this._reiniciarFormulario();
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

  public guardarUsuario(): void {
    

    if(this.usuarioFormulario.valid){
      
      const usuario: Usuario = {
        id        : this.usuarioUtilizadoEnModal?.id,
        username  : this.username?.value,
        password  : this.password?.value,
        rol       : Number(this.rol?.value),
        is_active : this.is_active?.value
      }
      
      this._enviarInformacionDeUsuario(usuario);
      this._culminarPeticion();
    }
  }

  private _enviarInformacionDeUsuario(usuario : Usuario){
    const dataDePeticion : DataUsuarioRegistroActualizar = {
      esRegistro: this.esRegistro, 
      usuario: { ...usuario}
    }; 
    this.enviarInformacionUsuario.emit(dataDePeticion);
  }

  private _culminarPeticion(): void {
    this.esRegistro==false?
      this.closeModal():
      this._reiniciarFormulario();
  }

  private _reiniciarFormulario(): void {
    this.usuarioFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuarioUtilizadoEnModal']){
      this.esRegistro = false;
      const usuario: Usuario = changes['usuarioUtilizadoEnModal'].currentValue;
      this.usuarioFormulario.reset({
        username  : usuario?.username,
        password  : usuario?.password,
        rol       : usuario.rol,
        is_active : usuario?.is_active
      });
      
    }else{
      this.esRegistro = true;
    }
    //Actualiza las validaciones según el tipo de uso del modal (esRegistro)
    this._actualizarValidacionesPassword();
  }

}
