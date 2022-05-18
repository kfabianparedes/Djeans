import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent {

  @Input() productosDeTabla : Producto[] = [];
  @Output() productoEliminado = new EventEmitter<number>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando ; 
  public filtroBusquedaProducto: string = '' ;

  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() esVisualizar = new EventEmitter<boolean>();

  @Output() productoParaActualizar = new EventEmitter<Producto>();

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService : ButtonProgressService) { }

  

  ngOnInit(): void {
  }

  public registroProducto() : void {
    this.tituloModal.emit('Registrar Producto');
    this.abrirModal.emit(true);
  }
  
  public actualizarProducto(producto : Producto) : void {
    this.tituloModal.emit('Actualizar Producto');
    this.abrirModal.emit(true);
    this.productoParaActualizar.emit(producto);
    this.esVisualizar.emit(false);
    
  }
  public visualizarProducto(producto : Producto) : void{
    this.esVisualizar.emit(true);
    this.tituloModal.emit('Ver Producto');
    this.abrirModal.emit(true);
    this.productoParaActualizar.emit(producto);
    
  }
  public reiniciarTabla(tabla : Table): void {
    tabla?.reset();
    
  }
  public eliminarProducto(idProducto: number) : void {
    this.productoEliminado.emit(idProducto);
  }
  
  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaProducto, 'contains');
  }

}
