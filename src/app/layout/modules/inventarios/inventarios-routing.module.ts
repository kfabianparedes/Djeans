import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInventarioComponent } from './pages/home-inventario/home-inventario.component';

const routes: Routes = [
  {path:'',component:HomeInventarioComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
