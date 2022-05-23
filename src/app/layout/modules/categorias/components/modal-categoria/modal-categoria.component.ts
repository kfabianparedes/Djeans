import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { validarCaracteresAlfabeticosConEspacios } from 'src/app/shared/utils/reutilizables';
import { Categoria } from '../../models/categoria.model';
import { DataCategoriaRegistroActualizar } from '../../models/registro-actualizar-categoria.model';
import { CATEGORY_MODAL_RESPONSIVE } from '../../utils/breakpoint-category-modal';

@Component({
  selector: 'modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit, OnChanges {

  
  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() categoriaUtilizadaEnModal! : Categoria;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() enviarInformacionCategoria = new EventEmitter<DataCategoriaRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;
  
  
  categoriaFormulario: FormGroup = this.fb.group({
    descripcion: ['', [ Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(30),
                        Validators.pattern(validarCaracteresAlfabeticosConEspacios)]],
    estado: [ true, Validators.required ],
  });

  private _datosIniciales = {
    descripcion: '',
    estado: true,
  };

  public readonly CATEGORY_MODAL_RESPONSIVE = CATEGORY_MODAL_RESPONSIVE;
  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService
    ) { }

  get descripcion(){
    return this.categoriaFormulario.get('descripcion');
  }
  get estado(){
    return this.categoriaFormulario.get('estado');
  }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  public guardarCategoria(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.categoriaFormulario.valid){
      const categoria : Categoria = {
        cat_id           :  this.categoriaUtilizadaEnModal?.cat_id,
        cat_descripcion  :  this.descripcion?.value,
        cat_estado       :  this.estado?.value
      }
      this._enviarInformacionDeCategoria(categoria);
      this._culminarPeticion();
    }
    return;
  }

  private _enviarInformacionDeCategoria(categoria : Categoria){
    const dataDePeticion : DataCategoriaRegistroActualizar = {
      esRegistro: this.esRegistro, 
      categoria: { ...categoria}
    }; 
    this.enviarInformacionCategoria.emit(dataDePeticion);
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
    this.categoriaFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categoriaUtilizadaEnModal']){
      this.esRegistro = false;
      const categoria: Categoria = changes['categoriaUtilizadaEnModal'].currentValue;
      this.categoriaFormulario.reset({
        descripcion: categoria?.cat_descripcion,
        estado: categoria?.cat_estado
      });
      
    }else{
      this.esRegistro = true;
    }
  }


}
