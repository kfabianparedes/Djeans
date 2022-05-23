import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { datosInicialesDescripcionEstado, validarCaracteresAlfanumericosConEspaciosMasSimbolos } from 'src/app/shared/utils/reutilizables';
import { Marca } from '../../models/marca';
import { DataMarcaRegistroActualizar } from '../../models/registro_actualizar_marca.model';
import { BRAND_MODAL_RESPONSIVE } from '../../utils/breakpoint-brand-modal';

@Component({
  selector: 'modal-marca',
  templateUrl: './modal-marca.component.html',
  styleUrls: ['./modal-marca.component.css']
})
export class ModalMarcaComponent implements OnInit {
  
  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() marcaUtilizadaEnModal!: Marca;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionMarca = new EventEmitter<DataMarcaRegistroActualizar>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public esRegistro : boolean = true;
  
  marcaFormulario: FormGroup = this.fb.group({
    descripcion: ['', [ Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(30),
                        Validators.pattern(validarCaracteresAlfanumericosConEspaciosMasSimbolos)]],
    estado: [ true, Validators.required ],
  });

  public readonly BRAND_MODAL_RESPONSIVE = BRAND_MODAL_RESPONSIVE;
  
  constructor(
    private fb: FormBuilder,
    public _buttonProgressService: ButtonProgressService
    ) { }

  get descripcion(){
    return this.marcaFormulario.get('descripcion');
  }
  get estado(){
    return this.marcaFormulario.get('estado');
  }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarMarca(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.marcaFormulario.valid){
      const marca : Marca = {
        mar_id           :  this.marcaUtilizadaEnModal?.mar_id,
        mar_descripcion  :  this.descripcion?.value,
        mar_estado       :  this.estado?.value
      }
      this._enviarInformacionDeMarca(marca);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeMarca(marca : Marca){
    const dataDePeticion : DataMarcaRegistroActualizar = {
      esRegistro: this.esRegistro, 
      marca: { ...marca}
    }; 
    this.enviarInformacionMarca.emit(dataDePeticion);
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
    this.marcaFormulario.reset({...datosInicialesDescripcionEstado});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['marcaUtilizadaEnModal']){
      this.esRegistro = false;
      const marca: Marca = changes['marcaUtilizadaEnModal'].currentValue;
      this.marcaFormulario.reset({
        descripcion: marca?.mar_descripcion,
        estado: marca?.mar_estado
      });
      
    }else{
      this.esRegistro = true;
    }
  }
}
