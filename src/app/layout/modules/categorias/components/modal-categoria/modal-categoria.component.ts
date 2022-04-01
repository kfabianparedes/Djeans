import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit, OnChanges {

  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Output() cerrarModal = new EventEmitter<boolean>();
  
  @Input() objetoCategoria!: Categoria;
  @Output() categoriaActualizarRegistrar = new EventEmitter();
  
  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  
  private validarDescripcion : RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
  
  categoriaFormulario: FormGroup = this.fb.group({
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

  esActualizarModal : boolean = false;

  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService
    ) { }

  ngOnInit(): void {
    this._reiniciarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['objetoCategoria']){
      this.esActualizarModal = true;
      const categoria: Categoria = changes['objetoCategoria'].currentValue;
      this.categoriaFormulario.reset({
        descripcion: categoria?.cat_descripcion,
        estado: categoria?.cat_estado
      });
      
    }else{
      this.esActualizarModal = false;
    }
  }

  get descripcion(){
    return this.categoriaFormulario.get('descripcion');
  }
  get estado(){
    return this.categoriaFormulario.get('estado');
  }

  private _reiniciarFormulario(): void {
    this.categoriaFormulario.reset({...this.datosIniciales});
  }

  public closeModal(): void {
    this._reiniciarFormulario();
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

  public guardarCategoria(): void {  //Guarda lo obtenido del formulario para update o create
    if (this.categoriaFormulario.valid){
      const categoria : Categoria = {
        cat_id           :  this.objetoCategoria?.cat_id,
        cat_descripcion  :  this.descripcion?.value,
        cat_estado       :  this.estado?.value
      }
      this.categoriaActualizarRegistrar.emit(categoria);
      
      if(this.esActualizarModal)
        this.closeModal();
      else
        this._reiniciarFormulario()
    }
    return;
  }

}
