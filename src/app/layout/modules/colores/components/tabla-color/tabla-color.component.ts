import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Color } from '../../models/color.model';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
@Component({
  selector: 'tabla-color',
  templateUrl: './tabla-color.component.html',
  styleUrls: ['./tabla-color.component.css']
})
export class TablaColorComponent implements OnInit {

  @Input() coloresDeTabla : Color[] = [] ;
  @Output() colorEliminado = new EventEmitter<number>(); 

  public cargando : Subject<boolean> = this._buttonProgressService.cargando ;
  public filtroBusquedaColor: string = '' ;

  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() colorParaActualizar = new EventEmitter<Color>();

  constructor(
    private _buttonProgressService: ButtonProgressService
  ) { }

  ngOnInit(): void {
  }

  public reiniciarTabla(tabla:Table) : void {
    tabla?.reset();
  }

  public registroColor() : void { 
    this.tituloModal.emit('Registrar Nuevo Color'); 
    this.abrirModal.emit(true);
  }
  public actualizarColor(color:Color) : void { 
    this.tituloModal.emit('Actualizar Color'); 
    this.abrirModal.emit(true); 
    this.colorParaActualizar.emit(color)
  }
  public eliminarColor(tal_id:number) : void {
    this.colorEliminado.emit(tal_id);
  }

  public filtrarBusqueda(tabla:Table) : void {
    tabla?.filterGlobal(this.filtroBusquedaColor, 'contains')
  }

}
