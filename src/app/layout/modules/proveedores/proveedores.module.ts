import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ModalProveedorComponent } from './components/modal-proveedor/modal-proveedor.component';
import { TablaProveedorComponent } from './components/tabla-proveedor/tabla-proveedor.component';
import { HomeProveedorComponent } from './pages/home-proveedor/home-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ModalProveedorComponent,
    TablaProveedorComponent,
    HomeProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalProveedorComponent
  ]
})
export class ProveedoresModule { }
