import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { REPORT_MODAL_RESPONSIVE } from '../../utils/breakpoint-Reporte-modal';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';

@Component({
  selector: 'modal-reporte-compra',
  templateUrl: './modal-reporte-compra.component.html',
  styleUrls: ['./modal-reporte-compra.component.css']
})
export class ModalReporteCompraComponent implements OnInit {


  //variables de la compra que se quiere visualizar 
  @Input() visualizarDetalleCompraSerie : string = '';
  @Input() visualizarDetalleCompraNumero : string = ''; 
  @Input() mostrarModal : boolean = false;
  @Input() detalles: DetalleDeCompra[] = [] ; 
  @Output() cerrarModal = new EventEmitter<boolean>();


  public cargando : Subject<boolean> = this.buttonProgressService.cargando;

  constructor( public buttonProgressService: ButtonProgressService,) { }

  public readonly REPORT_MODAL_RESPONSIVE = REPORT_MODAL_RESPONSIVE;

  ngOnInit(): void {
  }

  public closeModal(): void {
    console.log(this.detalles);
    
    this.mostrarModal=false;
    this.cerrarModal.emit(false);
  }

}
