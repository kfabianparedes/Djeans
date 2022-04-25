import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'categoria', loadChildren: () => import('./modules/categorias/categorias.module').then( m => m.CategoriasModule )},
      { path:'modelo', loadChildren: () => import('./modules/modelos/modelos.module').then( m => m.ModelosModule )},
      { path:'usuario', loadChildren: () => import('./modules/usuarios/usuarios.module').then( m => m.UsuariosModule )},
      { path:'color', loadChildren: () => import('./modules/colores/colores.module').then( m => m.ColoresModule )},
      { path:'talla', loadChildren: () => import('./modules/tallas/tallas.module').then( m => m.TallasModule )},
      { path:'', redirectTo:'', pathMatch:'full'},
      { path:'**', redirectTo:''}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
