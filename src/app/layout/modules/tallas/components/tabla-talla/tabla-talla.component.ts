import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Talla } from '../../models/talla.models';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';

@Component({
  selector: 'tabla-talla',
  templateUrl: './tabla-talla.component.html',
  styleUrls: ['./tabla-talla.component.css']
})
export class TablaTallaComponent implements OnInit {

  @Input() tallasDeTabla  : Talla[] = []; 
  @Output() tallaEliminada = new EventEmitter<number>(); 

  public cargando: Subject<boolean> = this._buttonProgressService.cargando ; 
  public filtroBusquedaTalla: string = '' ; 

  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() tallaParaActualizar = new EventEmitter<Talla>();

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService: ButtonProgressService) { }

  ngOnInit(): void {
  }

  public reiniciarTabla(tabla:Table) : void {
    tabla?.reset();
  }

  public registroTalla() : void { 
    this.tituloModal.emit('Registrar Nueva Talla'); 
    this.abrirModal.emit(true);
  }
  public actualizarTalla(talla:Talla) : void { 
    this.tituloModal.emit('Actualizar Talla'); 
    this.abrirModal.emit(true); 
    this.tallaParaActualizar.emit(talla)
  }
  public eliminarTalla(tal_id:number) : void {
    this.tallaEliminada.emit(tal_id);
  }

  public filtrarBusqueda(tabla:Table) : void {
    tabla?.filterGlobal(this.filtroBusquedaTalla, 'contains')
  }

}
