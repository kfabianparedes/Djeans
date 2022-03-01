import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListarSucursalComponent } from './layout/listar-sucursal/listar-sucursal.component';
import { MarcaComponent } from './layout/marca/marca.component';
import { ProveedorComponent } from './layout/proveedor/proveedor.component';
import { TiendaComponent } from './layout/tienda/tienda.component';

const routes: Routes = [
  {path:'home',component:LayoutComponent},
  {path:'sucursal', component:ListarSucursalComponent},
  {path:'tienda', component:TiendaComponent},
  {path:'marca', component:MarcaComponent},
  {path:'proveedor', component:ProveedorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
