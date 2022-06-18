import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteVentaComponent } from './pages/reporte-venta/reporte-venta.component';
import { ReporteCompraComponent } from './pages/reporte-compra/reporte-compra.component';


@NgModule({
  declarations: [
    ReporteVentaComponent,
    ReporteCompraComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
