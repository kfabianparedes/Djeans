import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Sucursal } from '../../models/sucursal.model';

@Component({
  selector: 'tabla-sucursal',
  templateUrl: './tabla-sucursal.component.html',
  styleUrls: ['./tabla-sucursal.component.css']
})
export class TablaSucursalComponent implements OnInit {

  @Input() sucursalesDeTabla : Sucursal[] = [];
  @Output() sucursalEliminado = new EventEmitter<number>();

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  public filtroBusquedaModelo: string = '';


  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() sucursalParaActualizar = new EventEmitter<Sucursal>();

  constructor(private _buttonProgressService: ButtonProgressService) { }

  ngOnInit(): void {
  }

  public registroSucursal(): void {
    this.tituloModal.emit('Registrar Nueva Sucursal');
    this.abrirModal.emit(true);
  }

  public actualizarSucursal(sucursal: Sucursal): void {
    this.tituloModal.emit('Registrar Nueva Sucursal');
    this.abrirModal.emit(true);
    this.sucursalParaActualizar.emit(sucursal);

  }

  public eliminarSucursal(idSucursal: number) : void {
    this.sucursalEliminado.emit(idSucursal);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }
  public filtrarBusqueda(tabla: Table): void{
    tabla?.filterGlobal(this.filtroBusquedaModelo, 'contains');
  }
}
