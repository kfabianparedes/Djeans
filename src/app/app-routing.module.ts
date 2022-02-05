import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListarSucursalComponent } from './layout/listar-sucursal/listar-sucursal.component';
import { ListarTiendaComponent } from './layout/listar-tienda/listar-tienda.component';

const routes: Routes = [
  {path:'home',component:LayoutComponent},
  {path:'sucursal', component:ListarSucursalComponent},
  {path:'tienda', component:ListarTiendaComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
