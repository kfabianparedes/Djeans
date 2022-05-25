import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesDeCompraRoutingModule } from './reportes-de-compra-routing.module';
import { ModalReporteCompraComponent } from './components/modal-reporte-compra/modal-reporte-compra.component';
import { TablaReporteCompraComponent } from './components/tabla-reporte-compra/tabla-reporte-compra.component';
import { HomeReporteCompraComponent } from './pages/home-reporte-compra/home-reporte-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ModalReporteCompraComponent,
    TablaReporteCompraComponent,
    HomeReporteCompraComponent
  ],
  imports: [
    CommonModule,
    ReportesDeCompraRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class ReportesDeCompraModule { }
