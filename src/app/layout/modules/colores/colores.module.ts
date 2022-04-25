import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColoresRoutingModule } from './colores-routing.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalColorComponent } from './components/modal-color/modal-color.component';
import { TablaColorComponent } from './components/tabla-color/tabla-color.component';
import { HomeColorComponent } from './pages/home-color/home-color.component';


@NgModule({
  declarations: [
    HomeColorComponent,
    ModalColorComponent,
    TablaColorComponent,
    HomeColorComponent
  ],
  imports: [
    CommonModule,
    ColoresRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ColoresModule { }
