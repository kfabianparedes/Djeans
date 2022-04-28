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

  private validarNombre: RegExp = /[a-zñáéíóú\- A-ZÑÁÉÍÓÚ 0-9]+$/;
  private validarDescripcion : RegExp = /[a-zñáéíóú\-.# A-ZÑÁÉÍÓÚ 0-9]+$/;

  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() sucursalUtilizadoEnModal!: Sucursal;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionSucursal = new EventEmitter<DataSucursalRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;


  sucursalFormulario: FormGroup = this.fb.group({
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
    return this.sucursalFormulario.get('nombre');
  }
  get direccion(){
    return this.sucursalFormulario.get('direccion');
  }
  get estado(){
    return this.sucursalFormulario.get('estado');
  }


  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarSucursal(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.sucursalFormulario.valid){
      const sucursal : Sucursal = {
        suc_id           :  this.sucursalUtilizadoEnModal?.suc_id,
        suc_nombre       :  this.nombre?.value,
        suc_direccion    :  this.direccion?.value,
        suc_estado       :  this.estado?.value
      }
      this._enviarInformacionDeSucursal(sucursal);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeSucursal(sucursal : Sucursal){
    const dataDePeticion : DataSucursalRegistroActualizar = {
      esRegistro: this.esRegistro,
      sucursal: { ...sucursal}
    };
    this.enviarInformacionSucursal.emit(dataDePeticion);
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
    this.sucursalFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['sucursalUtilizadoEnModal']){
      this.esRegistro = false;
      const sucursal: Sucursal = changes['sucursalUtilizadoEnModal'].currentValue;
      console.log(sucursal);
      this.sucursalFormulario.reset({
        nombre: sucursal?.suc_nombre,
        direccion: sucursal?.suc_direccion,
        estado: sucursal?.suc_estado
      });

    }else{
      this.esRegistro = true;
    }
  }

}
