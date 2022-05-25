import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeReporteCompraComponent } from './pages/home-reporte-compra/home-reporte-compra.component';

const routes: Routes=[
  {path:'',component:HomeReporteCompraComponent},
  {path:'**',redirectTo:''},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesDeCompraRoutingModule { }
