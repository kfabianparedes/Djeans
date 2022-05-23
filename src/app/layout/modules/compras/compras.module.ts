import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { HomeCompraComponent } from './pages/home-compra/home-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablaCompraComponent } from './components/tabla-compra/tabla-compra.component';
import { ModalCompraComponent } from './components/modal-compra/modal-compra.component';
import { ComprobantePagoComponent } from './components/comprobante-pago/comprobante-pago.component';
import { InformacionProveedorComponent } from './components/informacion-proveedor/informacion-proveedor.component';
import { InformacionProductoComponent } from './components/informacion-producto/informacion-producto.component';


@NgModule({
  declarations: [
    HomeCompraComponent,
    TablaCompraComponent,
    ModalCompraComponent,
    ComprobantePagoComponent,
    InformacionProveedorComponent,
    InformacionProductoComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComprasModule { }
