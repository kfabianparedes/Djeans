import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { ModalInventarioComponent } from './components/modal-inventario/modal-inventario.component';
import { TablaInventarioComponent } from './components/tabla-inventario/tabla-inventario.component';
import { HomeInventarioComponent } from './pages/home-inventario/home-inventario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalInventarioComponent,
    TablaInventarioComponent,
    HomeInventarioComponent
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule,SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class InventariosModule { }
