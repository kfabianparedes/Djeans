import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCompraComponent } from './pages/reporte-compra/reporte-compra.component';
import { ReporteVentaComponent } from './pages/reporte-venta/reporte-venta.component';

const routes: Routes = [
  {path:'compra',component:ReporteCompraComponent},
  {path:'venta',component:ReporteVentaComponent},
  {path:'**',redirectTo:'compra'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
