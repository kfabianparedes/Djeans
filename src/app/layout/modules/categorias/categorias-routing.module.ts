import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCategoriaComponent } from './pages/home-categoria/home-categoria.component';

const routes: Routes = [
  { path: '', component: HomeCategoriaComponent },
  { path: '**', redirectTo:'' },
    // children:[
    //   {path: 'listar', component: ListarCategoriaComponent},
    //   {path: '', redirectTo:'listar'},
    //   {path: '**', redirectTo:'listar'},
    // ]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
