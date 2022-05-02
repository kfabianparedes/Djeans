import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { DataTiendaRegistroActualizar } from '../../models/registro-actualizar-tienda';
import { Tienda } from '../../models/tienda.models';



@Component({
  selector: 'modal-tienda',
  templateUrl: './modal-tienda.component.html',
  styleUrls: ['./modal-tienda.component.css']
})
export class ModalTiendaComponent implements OnInit,OnChanges {

  private validarNombre:RegExp=/[a-zñáéíóú\- A-ZÑÁÉÍÓÚ 0-9]+$/;

  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() tiendaUtilizadoEnModal!: Tienda;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionTienda = new EventEmitter<DataTiendaRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;

  tiendaFormulario: FormGroup = this.fb.group({
    nombre:['', [ Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(30),
                  Validators.pattern(this.validarNombre)]],
    valorsucursal:['',[Validators.required]],
    estado: [ true, Validators.required ],
  });

  private _datosIniciales = {
    nombre:'',
    valorsucursal: '',
    estado: true,
  };


  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService
  ) { }

    get nombre(){
      return this.tiendaFormulario.get('nombre');
    }
    get valorsucursal(){
      return this.tiendaFormulario.get('valorsucursal')
    }
    get estado(){
      return this.tiendaFormulario.get('estado');
    }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarTienda(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.tiendaFormulario.valid){
      const sucursal : Tienda = {
        tie_id           :  this.tiendaUtilizadoEnModal?.tie_id,
        tie_nombre       :  this.nombre?.value,
        tie_suc_id       :  this.valorsucursal?.value,
        tie_estado       :  this.estado?.value
      }
      this._enviarInformacionDeSucursal(sucursal);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeSucursal(tienda : Tienda){
    const dataDePeticion : DataTiendaRegistroActualizar = {
      esRegistro: this.esRegistro,
      tienda: { ...tienda}
    };
    this.enviarInformacionTienda.emit(dataDePeticion);
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
    this.tiendaFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tiendaUtilizadoEnModal']){
      this.esRegistro = false;
      const tienda: Tienda = changes['tiendaUtilizadoEnModal'].currentValue;
      console.log(tienda);
      this.tiendaFormulario.reset({
        nombre: tienda?.tie_nombre,
        sucursal: tienda?.tie_suc_id,
        estado: tienda?.tie_estado
      });

    }else{
      this.esRegistro = true;
    }
  }


}
