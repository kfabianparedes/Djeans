import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Categoria } from '../../models/categoria.model';
import { DataRegistroActualizar } from '../../models/data-registro-actualizar';

@Component({
  selector: 'tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent{
  @Input() categoriasDeTabla : Categoria[] = [];
  @Output() categoriaEliminada = new EventEmitter<number>();
  @Output() categoriaActualizarRegistrar = new EventEmitter();

  @ViewChild('#tablaCategoria') private tablaCategoria! : Table;

  public filtroBusquedaCategoria: string = '';
  public mostrarModal: boolean = false;
  private esRegistro : boolean = true;
  public cargando : Subject<boolean> = this.buttonProgressService.cargando;


  public objetoCategoriaUtilizado!: Categoria;
  public tituloModal : string = '';

  constructor(private buttonProgressService:ButtonProgressService){}

  public abrirModalCategoria( tituloModal : string ): void {
    this.tituloModal = tituloModal;
    this.mostrarModal = true;
  }

  public eliminarCategoria(idCategoria: number): void {
    this.categoriaEliminada.emit(idCategoria);
    this._reiniciarTabla();
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
    const peticionCategoria : DataRegistroActualizar = {
      esRegistro: this.esRegistro, 
      categoria: { ...categoria}
    }; 
    this.categoriaActualizarRegistrar.emit(peticionCategoria);
  }


  private _reiniciarTabla(): void {
    this.tablaCategoria?.reset();
  }
  

}


