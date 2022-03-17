import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'categoria', loadChildren: () => import('./modules/categorias/categorias.module').then( m => m.CategoriasModule )},
      { path:'usuario', loadChildren: () => import('./modules/usuarios/usuarios.module').then( m => m.UsuariosModule )},
      { path:'', redirectTo:'', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
