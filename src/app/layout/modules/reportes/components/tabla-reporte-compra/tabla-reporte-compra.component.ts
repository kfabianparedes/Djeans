import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Compra } from '../../../compras/models/compra.model';
import { ReporteCompraService } from '../../pages/reporte-compra/services/reporte-compra.service';

@Component({
  selector: 'tabla-reporte-compra',
  templateUrl: './tabla-reporte-compra.component.html',
  styleUrls: ['./tabla-reporte-compra.component.css']
})
export class TablaReporteCompraComponent {

  @Input() reportesCompraTabla : Compra[] = []; 
  @Output() visualizarDetalleCompraId = new EventEmitter<number>();
  @Output() visualizarDetalleCompraSerie = new EventEmitter<string>();
  @Output() visualizarDetalleCompraNumero = new EventEmitter<string>();
  @Output() fechasFiltro = new EventEmitter<string[]>();
  @Output() mostrarModal = new EventEmitter<boolean>();
  public cargando : Subject<boolean> = this._buttonProgressService.cargando;

  filtroFormulario : FormGroup = this.fb.group({
    fechaInicio:['',[Validators.required]],
    fechaFin: ['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private _buttonProgressService : ButtonProgressService,
  ) { }

  ngOnInit(): void {
  }

  private _datosIniciales = {
    fechaInicio : '',
    fechaFin : ''
  }
  public reiniciarTabla(tabla : Table): void {
    tabla?.reset();
  }

  get fechaInicio(){
    return this.filtroFormulario.get('fechaInicio');
  }

  get fechaFin(){
    return this.filtroFormulario.get('fechaFin');
  }


  public visualizarDetalleDeCompra(idCompra : number, serie: string, numero: string) : void{
    this.visualizarDetalleCompraId.emit(idCompra);
    this.visualizarDetalleCompraSerie.emit(serie)
    this.visualizarDetalleCompraNumero.emit(numero)
    this.mostrarModal.emit(true)
  }
  public enviarRangoDeFechas():void{
    this.fechasFiltro.emit([this.fechaInicio?.value,this.fechaFin?.value]);
    this.filtroFormulario.reset(this._datosIniciales);
  }


  public refrescarLista() : void {
    this.fechasFiltro.emit(["refrescar","refrescar",]);
    this.filtroFormulario.reset(this._datosIniciales);
  }

}
