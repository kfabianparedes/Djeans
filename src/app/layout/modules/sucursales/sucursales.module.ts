import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSucursalComponent } from './components/modal-sucursal/modal-sucursal.component';
import { TablaSucursalComponent } from './components/tabla-sucursal/tabla-sucursal.component';
import { HomeSucursalComponent } from './pages/home-sucursal/home-sucursal.component';
import { SucursalesRoutingModule } from './sucursales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ModalSucursalComponent,
    TablaSucursalComponent,
    HomeSucursalComponent
  ],
  imports: [
    CommonModule,
    SucursalesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SucursalesModule { }
