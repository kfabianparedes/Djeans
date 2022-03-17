import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCategoriaComponent } from './pages/home-categoria/home-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: HomeCategoriaComponent,
    children:[
      {path: 'listar', component: ListarCategoriaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
