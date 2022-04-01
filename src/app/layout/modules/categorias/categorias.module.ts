import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { HomeCategoriaComponent } from './pages/home-categoria/home-categoria.component';
import { TablaCategoriaComponent } from './components/tabla-categoria/tabla-categoria.component';
import { ModalCategoriaComponent } from './components/modal-categoria/modal-categoria.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeCategoriaComponent,
    TablaCategoriaComponent,
    ModalCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
