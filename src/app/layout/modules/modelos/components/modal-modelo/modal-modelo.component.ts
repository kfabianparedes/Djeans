import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Modelo } from '../../models/modelo.model';
import { DataModeloRegistroActualizar } from '../../models/registro-actualizar-modelo.model';

@Component({
  selector: 'modal-modelo',
  templateUrl: './modal-modelo.component.html',
  styleUrls: ['./modal-modelo.component.css']
})
export class ModalModeloComponent implements OnInit, OnChanges {


  private validarDescripcion : RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() modeloUtilizadoEnModal!: Modelo;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionModelo = new EventEmitter<DataModeloRegistroActualizar>();
  
  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;


  modeloFormulario: FormGroup = this.fb.group({
    descripcion: ['', [ Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(30),
                        Validators.pattern(this.validarDescripcion)]],
    estado: [ true, Validators.required ],
  });

  datosIniciales = {
    descripcion: '',
    estado: true,
  };

  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService
    ) { }

  get descripcion(){
    return this.modeloFormulario.get('descripcion');
  }
  get estado(){
    return this.modeloFormulario.get('estado');
  }


  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarModelo(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.modeloFormulario.valid){
      const modelo : Modelo = {
        mod_id           :  this.modeloUtilizadoEnModal?.mod_id,
        mod_descripcion  :  this.descripcion?.value,
        mod_estado       :  this.estado?.value
      }
      this._enviarInformacionDeModelo(modelo);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeModelo(modelo : Modelo){
    const dataDePeticion : DataModeloRegistroActualizar = {
      esRegistro: this.esRegistro, 
      modelo: { ...modelo}
    }; 
    this.enviarInformacionModelo.emit(dataDePeticion);
  }

  private _culminarPeticion(): void {
    this.esRegistro==false?
      this.closeModal():
      this._reiniciarFormulario();
  }

  public closeModal(): void {
    this._reiniciarFormulario();
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

  private _reiniciarFormulario(): void {
    this.modeloFormulario.reset({...this.datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['modeloUtilizadoEnModal']){
      this.esRegistro = false;
      const modelo: Modelo = changes['modeloUtilizadoEnModal'].currentValue;
      console.log(modelo);
      this.modeloFormulario.reset({
        descripcion: modelo?.mod_descripcion,
        estado: modelo?.mod_estado
      });
      
    }else{
      this.esRegistro = true;
    }
  }
}
