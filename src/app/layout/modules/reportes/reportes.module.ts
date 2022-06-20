import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteVentaComponent } from './pages/reporte-venta/reporte-venta.component';
import { ReporteCompraComponent } from './pages/reporte-compra/reporte-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { TablaReporteCompraComponent } from './components/tabla-reporte-compra/tabla-reporte-compra.component';
import { ModalReporteCompraComponent } from './components/modal-reporte-compra/modal-reporte-compra.component';


@NgModule({
  declarations: [
    ReporteVentaComponent,
    ReporteCompraComponent,
    TablaReporteCompraComponent,
    ModalReporteCompraComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class ReportesModule { }
