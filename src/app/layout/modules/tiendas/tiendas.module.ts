import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendasRoutingModule } from './tiendas-routing.module';
import { HomeTiendaComponent } from './pages/home-tienda/home-tienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalTiendaComponent } from './components/modal-tienda/modal-tienda.component';
import { TablaTiendaComponent } from './components/tabla-tienda/tabla-tienda.component';


@NgModule({
  declarations: [
    HomeTiendaComponent,
    ModalTiendaComponent,
    TablaTiendaComponent
  ],
  imports: [
    CommonModule,
    TiendasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TiendasModule { }
