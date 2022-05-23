import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Color } from '../../models/color.model';
import {DataColorRegistroActualizar} from '../../models/registro-actualizar-color.model';

@Component({
  selector: 'modal-color',
  templateUrl: './modal-color.component.html',
  styleUrls: ['./modal-color.component.css']
})
export class ModalColorComponent implements OnInit {

  private validarDescripcion : RegExp = /^[^\s][a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
  private validarDescripcion2 : RegExp = /[a-zñáéíóúA-ZÑÁÉÍÓÚ]+@[a-zñáéíóúA-ZÑÁÉÍÓÚ ]$/
  ///^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  @Input() mostrarModal : boolean = false; 
  @Input() tituloModal : string = '';
  @Input() colorUtilizadoEnModal!: Color; 
  @Output() cerrarModal = new EventEmitter<boolean>(); 
  @Output() enviarInformacionColor = new EventEmitter<DataColorRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando ; 
  public esRegistro : boolean = true ;

  colorFormulario: FormGroup = this.fb.group(
    {
      descripcion:['',[Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(30),
                      Validators.pattern(this.validarDescripcion)

      ]],
      estado:[true, Validators.required]
    }
  );

  private _datosIniciales = {
    descripcion : "",
    estado : true 
  }
  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  constructor(private fb: FormBuilder,
    private buttonProgressService: ButtonProgressService) { }

  private _enviarInformacionDeColor(color : Color){
    const dataPeticion : DataColorRegistroActualizar = {
      esRegistro : this.esRegistro, 
      color : {...color}
    }
    this.enviarInformacionColor.emit(dataPeticion);
    
  }

  get descripcion(){
    return this.colorFormulario.get('descripcion');
  }
  get estado(){
    return this.colorFormulario.get('estado');
  }

  public guardarColor(): void {
    if(this.colorFormulario.valid){
      const talla : Color = {
        col_id : this.colorUtilizadoEnModal?.col_id , 
        col_descripcion : this.descripcion?.value, 
        col_estado : this.estado?.value
      }
      
      this._enviarInformacionDeColor(talla);
      this._culminarPeticion();
    }
    return
  }

  private _reiniciarFormulario() : void {
    this.colorFormulario.reset({...this._datosIniciales})
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
    if(changes['colorUtilizadoEnModal']){
      this.esRegistro = false; 
      const color : Color = changes['colorUtilizadoEnModal'].currentValue; 
      this.colorFormulario.reset({
        descripcion: color?.col_descripcion,
        estado : color?.col_estado
      }) 
    }else{
      this.esRegistro = true ; 
    }
  }

}
