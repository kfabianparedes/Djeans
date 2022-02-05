import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ListarSucursalComponent } from './listar-sucursal/listar-sucursal.component';
import { ListarTiendaComponent } from './listar-tienda/listar-tienda.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {path:'listar-sucursal', component:ListarSucursalComponent},
      {path:'listar-tienda', component:ListarTiendaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
