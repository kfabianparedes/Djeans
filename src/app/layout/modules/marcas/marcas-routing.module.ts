import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMarcaComponent } from './pages/home-marca/home-marca.component';


const routes: Routes=[
  {path:'',component:HomeMarcaComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class MarcasRoutingModule { }
