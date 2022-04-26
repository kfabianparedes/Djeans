import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSucursalComponent } from './pages/home-sucursal/home-sucursal.component';

const routes: Routes=[
  {path:'',component:HomeSucursalComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class SucursalesRoutingModule { }
