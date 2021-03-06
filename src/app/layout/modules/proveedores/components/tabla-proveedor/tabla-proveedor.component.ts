import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'tabla-proveedor',
  templateUrl: './tabla-proveedor.component.html',
  styleUrls: ['./tabla-proveedor.component.css']
})
export class TablaProveedorComponent {

  @Input() proveedoresDeTabla : Proveedor[] = [];
  @Output() proveedorEliminado = new EventEmitter<number>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public filtroBusquedaProveedor : string = '';

  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() esVisualizar = new EventEmitter<boolean>();

  @Output() proveedorParaActualizar = new EventEmitter<Proveedor>();
  
  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService : ButtonProgressService) { }

  

  public registroProveedor() : void {
    this.tituloModal.emit('Registrar Proveedor');
    this.abrirModal.emit(true);
  }
  
  public actualizarProveedor(proveedor : Proveedor) : void {
    this.tituloModal.emit('Actualizar Proveedor');
    this.abrirModal.emit(true);
    this.proveedorParaActualizar.emit(proveedor);
    this.esVisualizar.emit(false);
    
  }
  public visualizarProveedor(proveedor : Proveedor) : void{
    this.esVisualizar.emit(true);
    this.tituloModal.emit('Ver Proveedor');
    this.abrirModal.emit(true);
    this.proveedorParaActualizar.emit(proveedor);
    
  }
  public reiniciarTabla(tabla : Table): void {
    tabla?.reset();
    
  }

  public eliminarProveedor(idProveedor: number) : void {
    this.proveedorEliminado.emit(idProveedor);
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaProveedor, 'contains');
  }

}
