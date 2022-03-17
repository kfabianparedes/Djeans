import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { HomeCategoriaComponent } from './pages/home-categoria/home-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';


@NgModule({
  declarations: [
    HomeCategoriaComponent,
    ListarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
