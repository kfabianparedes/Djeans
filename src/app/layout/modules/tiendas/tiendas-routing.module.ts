import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTiendaComponent } from './pages/home-tienda/home-tienda.component';

const routes: Routes=[
  {path:'',component:HomeTiendaComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TiendasRoutingModule { }
