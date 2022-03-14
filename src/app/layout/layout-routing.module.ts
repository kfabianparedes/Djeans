import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      { path:'tienda',component: TiendaComponent },
      { path:'proveedor',component: ProveedorComponent },
      { path:'usuario', loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosModule )},
      { path:'', redirectTo:'', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
