import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Modelo } from '../../models/modelo.model';

@Component({
  selector: 'tabla-modelo',
  templateUrl: './tabla-modelo.component.html',
  styleUrls: ['./tabla-modelo.component.css']
})
export class TablaModeloComponent{
  
  @Input() modelosDeTabla : Modelo[] = [];
  @Output() modeloEliminado = new EventEmitter<number>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public filtroBusquedaModelo: string = '';
  
  
  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() modeloParaActualizar = new EventEmitter<Modelo>();

  constructor(private _buttonProgressService: ButtonProgressService) { }

  public registroModelo(): void {
    this.tituloModal.emit('Registrar Nuevo Modelo');
    this.abrirModal.emit(true);
  }

  public actualizarModelo(modelo: Modelo): void {
    this.tituloModal.emit('Actualizar Modelo');
    this.abrirModal.emit(true);
    this.modeloParaActualizar.emit(modelo);
  }

  public eliminarModelo(idModelo: number) : void {
    this.modeloEliminado.emit(idModelo);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaModelo, 'contains');
  }
}
