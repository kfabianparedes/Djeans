import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Producto } from '../../../productos/models/producto.model';
import { PRODUCT_TABLE_RESPONSIVE } from '../../utils/breakpoint-tabla-productos';

@Component({
  selector: 'tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnChanges  {
  verTabla: boolean = true;
  @Input() mostrarTablaProductos!: boolean;
  @Output() cerrarTablaProductos = new EventEmitter<boolean>();
  @Input() productosDeTabla: Producto[] = [];
  @Output() crearNuevoProducto = new EventEmitter<boolean>();

  @Output() enviarProducto = new EventEmitter<Producto>();


  public cargando : Subject<boolean> = this._buttonProgressService.cargando ; 
  public filtroBusquedaProducto: string = '' ;

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService : ButtonProgressService) { }

  public reiniciarTabla(tabla : Table): void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaProducto, 'contains');
  }

  public closeModal(): void {
    this.mostrarTablaProductos=false;
    this.cerrarTablaProductos.emit(false);
  }

  public readonly PRODUCT_TABLE_RESPONSIVE = PRODUCT_TABLE_RESPONSIVE;
  ngOnChanges(changes: SimpleChanges): void {
    // this.mostrarTablaProductos = changes['mostrarModal'].currentValue; 
    // if(!this.mostrarModal)
    //   this.guiaRemisionForm.reset({...this._datosIniciales});
  }
  
  public registrarNuevoProducto(): void {
    this.crearNuevoProducto.emit(true);
  }

  public enviarDetalle(producto: Producto): void {
    console.log(producto);
    this.productosDeTabla = [...this.productosDeTabla.filter(($producto: Producto) => $producto !== producto)];//[...this.productosDeTabla.filter(($producto: Producto) => $producto !== producto)]
    this.enviarProducto.emit(producto);
  }
}
