import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Marca } from '../../models/marca';

@Component({
  selector: 'tabla-marca',
  templateUrl: './tabla-marca.component.html',
  styleUrls: ['./tabla-marca.component.css']
})
export class TablaMarcaComponent {
  @Input() marcasDeTabla : Marca[] = [];
  @Output() marcaEliminada = new EventEmitter<number>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public filtroBusquedaMarca: string = '';
  

  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() marcaParaActualizar = new EventEmitter<Marca>();

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService: ButtonProgressService) { }

  public registroMarca(): void {
    this.tituloModal.emit('Registrar Nueva Marca');
    this.abrirModal.emit(true);
  }

  public actualizarMarca(Marca: Marca): void {
    this.tituloModal.emit('Actualizar Marca');
    this.abrirModal.emit(true);
    this.marcaParaActualizar.emit(Marca);
  }

  public eliminarMarca(idMarca: number) : void {
    this.marcaEliminada.emit(idMarca);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaMarca, 'contains');
  }


}
