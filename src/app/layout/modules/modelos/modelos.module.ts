import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelosRoutingModule } from './modelos-routing.module';
import { HomeModeloComponent } from './pages/home-modelo/home-modelo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablaModeloComponent } from './components/tabla-modelo/tabla-modelo.component';
import { ModalModeloComponent } from './components/modal-modelo/modal-modelo.component';


@NgModule({
  declarations: [
    HomeModeloComponent,
    TablaModeloComponent,
    ModalModeloComponent
  ],
  imports: [
    CommonModule,
    ModelosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModelosModule { }
