import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Tienda } from '../../models/tienda.models';


@Component({
  selector: 'tabla-tienda',
  templateUrl: './tabla-tienda.component.html',
  styleUrls: ['./tabla-tienda.component.css']
})
export class TablaTiendaComponent implements OnInit {

  @Input() tiendasDeTabla : Tienda[] = [];
  @Output() tiendaEliminado = new EventEmitter<number>();

  public cargando:Subject<boolean>=this._buttonProgressService.cargando;
  public filtroBusquedaTienda:string='';


  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() tiendaParaActualizar = new EventEmitter<Tienda>();

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService: ButtonProgressService) { }

  ngOnInit(): void {
  }
  public registroTienda(): void {
    this.tituloModal.emit('Registrar Nueva Tienda');
    this.abrirModal.emit(true);
  }

  public actualizarTienda(tienda: Tienda): void {
    this.tituloModal.emit('Registrar Nueva Tienda');
    this.abrirModal.emit(true);
    this.tiendaParaActualizar.emit(tienda);

  }

  public eliminarTienda(idTienda: number) : void {
    this.tiendaEliminado.emit(idTienda);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }
  public filtrarBusqueda(tabla: Table): void{
    tabla?.filterGlobal(this.filtroBusquedaTienda, 'contains');
  }



}
