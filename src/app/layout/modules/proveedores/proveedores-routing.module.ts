import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProveedorComponent } from './pages/home-proveedor/home-proveedor.component';

const routes: Routes=[
  {path:'',component:HomeProveedorComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ProveedoresRoutingModule { }
