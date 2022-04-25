import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent{

  @Input() categoriasDeTabla : Categoria[] = [];
  @Output() categoriaEliminada = new EventEmitter<number>();

  //Variable boton en carga
  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  //Variables tabla
  public filtroBusquedaCategoria: string = '';


  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() categoriaParaActualizar = new EventEmitter<Categoria>();

  constructor(private _buttonProgressService: ButtonProgressService){ }

  public registroCategoria() : void {
    this.tituloModal.emit('Registrar Nueva Categoría');
    this.abrirModal.emit(true);
  }

  public actualizarCategoria( categoria:Categoria ): void {
    this.tituloModal.emit('Actualizar Categoría');
    this.abrirModal.emit(true);
    this.categoriaParaActualizar.emit(categoria);
  }

  public eliminarCategoria(idCategoria: number): void {
    this.categoriaEliminada.emit(idCategoria);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaCategoria, 'contains');
  }

}


