import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SucursalService } from 'src/app/layout/modules/sucursales/services/sucursal.service';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Sucursal } from '../../../sucursales/models/sucursal.model';
import { DataTiendaRegistroActualizar } from '../../models/registro-actualizar-tienda';
import { Tienda } from '../../models/tienda.models';
import { STORE_MODAL_RESPONSIVE } from '../../utils/breakpoint-tienda-modal';



@Component({
  selector: 'modal-tienda',
  templateUrl: './modal-tienda.component.html',
  styleUrls: ['./modal-tienda.component.css']
})
export class ModalTiendaComponent implements OnInit,OnChanges {

  private validarNombre:RegExp=/[a-zñáéíóú\- A-ZÑÁÉÍÓÚ 0-9]+$/;
  @Input() sucursales : Sucursal[] = [];
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
    sucursal:['',[Validators.required]],
    estado: [ true, Validators.required ],
  });

  private _datosIniciales = {
    nombre:'',
    estado: true,
    sucursal: '',
  };

  public readonly STORE_MODAL_RESPONSIVE = STORE_MODAL_RESPONSIVE;
  
  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService,
  ) { }

    get nombre(){
      return this.tiendaFormulario.get('nombre');
    }
    get sucursal(){
      return this.tiendaFormulario.get('sucursal')
    }
    get estado(){
      return this.tiendaFormulario.get('estado');
    }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarTienda(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.tiendaFormulario.valid){
      const tienda : Tienda = {
        tie_id           :  this.tiendaUtilizadoEnModal?.tie_id,
        tie_nombre       :  this.nombre?.value,
        tie_suc_id       :  +this.sucursal?.value,
        tie_estado       :  this.estado?.value
      }
      this._enviarInformacionDeSucursal(tienda);
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
