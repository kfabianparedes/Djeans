import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ModalProductoComponent } from './components/modal-producto/modal-producto.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { HomeProductoComponent } from './pages/home-producto/home-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ModalProductoComponent,
    TablaProductoComponent,
    HomeProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
