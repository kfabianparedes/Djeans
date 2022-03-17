import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ListarSucursalComponent } from './listar-sucursal/listar-sucursal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { MarcaComponent } from './marca/marca.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ListarSucursalComponent,
    ProveedorComponent,
    MarcaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
