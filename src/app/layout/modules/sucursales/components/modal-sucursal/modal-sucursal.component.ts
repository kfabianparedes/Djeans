import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { DataSucursalRegistroActualizar } from '../../models/registro-actualizar-sucursal.model';
import { Sucursal } from '../../models/sucursal.model';



@Component({
  selector: 'modal-sucursal',
  templateUrl: './modal-sucursal.component.html',
  styleUrls: ['./modal-sucursal.component.css']
})
export class ModalSucursalComponent implements OnInit,OnChanges {

  private validarDescripcion : RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
  private validarNombre: RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;

  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() modeloUtilizadoEnModal!: Sucursal;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionModelo = new EventEmitter<DataSucursalRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;


  modeloFormulario: FormGroup = this.fb.group({
    nombre:['', [ Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(30),
                  Validators.pattern(this.validarNombre)]],

    direccion: ['', [ Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(30),
                        Validators.pattern(this.validarDescripcion)]],

    estado: [ true, Validators.required ],
  });

  private _datosIniciales = {
    nombre:'',
    descripcion: '',
    estado: true,
  };

  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService
    ) { }

  get nombre(){
    return this.modeloFormulario.get('nombre');
  }
  get direccion(){
    return this.modeloFormulario.get('direccion');
  }
  get estado(){
    return this.modeloFormulario.get('estado');
  }


  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarSucursal(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.modeloFormulario.valid){
      const modelo : Sucursal = {
        suc_id           :  this.modeloUtilizadoEnModal?.suc_id,
        suc_nombre       :  this.nombre?.value,
        suc_direccion    :  this.direccion?.value,
        suc_estado       :  this.estado?.value
      }
      this._enviarInformacionDeSucursal(modelo);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeSucursal(modelo : Sucursal){
    const dataDePeticion : DataSucursalRegistroActualizar = {
      esRegistro: this.esRegistro,
      sucursal: { ...modelo}
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
    this.modeloFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['modeloUtilizadoEnModal']){
      this.esRegistro = false;
      const modelo: Sucursal = changes['modeloUtilizadoEnModal'].currentValue;
      console.log(modelo);
      this.modeloFormulario.reset({
        nombre: modelo?.suc_nombre,
        direccion: modelo?.suc_direccion,
        estado: modelo?.suc_estado
      });

    }else{
      this.esRegistro = true;
    }
  }

}
