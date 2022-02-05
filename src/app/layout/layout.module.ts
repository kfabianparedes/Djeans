import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ListarSucursalComponent } from './listar-sucursal/listar-sucursal.component';
import { ListarTiendaComponent } from './listar-tienda/listar-tienda.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ListarSucursalComponent,
    ListarTiendaComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
