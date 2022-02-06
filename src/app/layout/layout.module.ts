import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ListarSucursalComponent } from './listar-sucursal/listar-sucursal.component';
import { ListarTiendaComponent } from './listar-tienda/listar-tienda.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    ListarSucursalComponent,
    ListarTiendaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
