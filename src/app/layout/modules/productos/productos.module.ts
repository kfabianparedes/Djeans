import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { HomeProductoComponent } from './pages/home-producto/home-producto.component';


@NgModule({
  declarations: [
    ModalProductoComponent,
    TablaProductoComponent,
    HomeProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
