import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Categoria } from '../../models/categoria.model';
import { DataCategoriaRegistroActualizar } from '../../models/registro-actualizar-categoria.model';

@Component({
  selector: 'tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent{
  @Input() categoriasDeTabla : Categoria[] = [];
  @Output() categoriaEliminada = new EventEmitter<number>();
  @Output() categoriaActualizarRegistrar = new EventEmitter();

  //Variables tabla
  public filtroBusquedaCategoria: string = '';
  
  //Variables modal
  public objetoCategoriaUtilizado!: Categoria;
  public tituloModal : string = '';
  public mostrarModal: boolean = false;
  private esRegistro : boolean = true;

  //Variable boton en carga
  public cargando : Subject<boolean> = this.buttonProgressService.cargando;

  constructor(private buttonProgressService:ButtonProgressService){}

  public abrirModalCategoria( tituloModal : string ): void {
    this.tituloModal = tituloModal;
    this.mostrarModal = true;
  }

  public eliminarCategoria(idCategoria: number): void {
    this.categoriaEliminada.emit(idCategoria);
  }

  public registroCategoria() : void {
    this.esRegistro = true;
    this.abrirModalCategoria('Registrar Nueva Categoría');
    
  }

  public actualizarCategoria( categoria:Categoria ): void {
    this.esRegistro = false;
    this.objetoCategoriaUtilizado = {...categoria} as Categoria;
    this.abrirModalCategoria('Actualizar Categoría');
  }
  
  public guardarDataCategoria(categoria:Categoria){
    const peticionCategoria : DataCategoriaRegistroActualizar = {
      esRegistro: this.esRegistro, 
      categoria: { ...categoria}
    }; 
    this.categoriaActualizarRegistrar.emit(peticionCategoria);
  }


  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }
  

}


