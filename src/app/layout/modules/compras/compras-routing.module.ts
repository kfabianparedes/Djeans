import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCompraComponent } from './pages/home-compra/home-compra.component';

const routes: Routes=[
  {path:'',component:HomeCompraComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
