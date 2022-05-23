import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Talla } from '../../models/talla.models';
import {DataTallaRegistroActualizar} from '../../models/registro-actualizar-talla.model';
import { SIZE_MODAL_RESPONSIVE } from '../../utils/breakpoint-talla-modal';

@Component({
  selector: 'modal-talla',
  templateUrl: './modal-talla.component.html',
  styleUrls: ['./modal-talla.component.css']
})
export class ModalTallaComponent implements OnInit {

  private validarDescripcion : RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ0-9]+$/;
  @Input() mostrarModal : boolean = false; 
  @Input() tituloModal : string = '';
  @Input() tallaUtilizadaEnModal!: Talla; 
  @Output() cerrarModal = new EventEmitter<boolean>(); 
  @Output() enviarInformacionTalla = new EventEmitter<DataTallaRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando ; 
  public esRegistro : boolean = true ;
  
  tallaFormulario: FormGroup = this.fb.group(
    {
      descripcion:['',[Validators.required,
                      Validators.minLength(1),
                      Validators.maxLength(3),
                      Validators.pattern(this.validarDescripcion)

      ]],
      estado:[true, Validators.required]
    }
  );

  private _datosIniciales = {
    descripcion : "",
    estado : true 
  }

  public readonly SIZE_MODAL_RESPONSIVE = SIZE_MODAL_RESPONSIVE;
  
  constructor(
    private fb: FormBuilder,
    private buttonProgressService: ButtonProgressService) { }

    get descripcion(){
      return this.tallaFormulario.get('descripcion');
    }
    get estado(){
      return this.tallaFormulario.get('estado');
    }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarTalla(): void {
    if(this.tallaFormulario.valid){
      const talla : Talla = {
        tal_id : this.tallaUtilizadaEnModal?.tal_id , 
        tal_descripcion : this.descripcion?.value, 
        tal_estado : this.estado?.value
      }
      this._enviarInformacionDeTalla(talla);
      this._culminarPeticion();
    }
    return
  }

  private _enviarInformacionDeTalla(talla : Talla){
    const dataPeticion : DataTallaRegistroActualizar = {
      esRegistro : this.esRegistro, 
      talla : {...talla}
    }
    this.enviarInformacionTalla.emit(dataPeticion);
  }

  private _reiniciarFormulario() : void {
    this.tallaFormulario.reset({...this._datosIniciales})
  }

  public closeModal(): void {
    this._reiniciarFormulario();
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

  private _culminarPeticion(): void {
    this.esRegistro==false?
      this.closeModal():
      this._reiniciarFormulario();
  }

  ngOnChanges(changes:SimpleChanges) : void{
    if(changes['tallaUtilizadaEnModal']){
      this.esRegistro = false; 
      const talla : Talla = changes['tallaUtilizadaEnModal'].currentValue; 
      this.tallaFormulario.reset({
        descripcion: talla?.tal_descripcion,
        estado : talla?.tal_estado
      }) 
    }else{
      this.esRegistro = true ; 
    }
  }

}
