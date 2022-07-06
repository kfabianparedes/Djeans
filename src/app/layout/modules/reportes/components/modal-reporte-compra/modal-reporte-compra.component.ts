import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { REPORT_MODAL_RESPONSIVE } from '../../utils/breakpoint-reporte-modal';

@Component({
  selector: 'modal-reporte-compra',
  templateUrl: './modal-reporte-compra.component.html',
  styleUrls: ['./modal-reporte-compra.component.css']
})
export class ModalReporteCompraComponent{

  //variables de la compra que se quiere visualizar 
  @Input() visualizarDetalleCompraSerie : string = '';
  @Input() visualizarDetalleCompraNumero : string = ''; 
  @Input() mostrarModal : boolean = false;
  @Input() detalles: DetalleDeCompra[] = [] ; 
  @Output() cerrarModal = new EventEmitter<boolean>();


  public cargando : Subject<boolean> = this.buttonProgressService.cargando;

  constructor( public buttonProgressService: ButtonProgressService,) { }

  public readonly REPORT_MODAL_RESPONSIVE = REPORT_MODAL_RESPONSIVE;

  public closeModal(): void {
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

}
