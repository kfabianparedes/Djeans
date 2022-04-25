import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeColorComponent} from './pages/home-color/home-color.component'
const routes: Routes = [
  {path:'',component:HomeColorComponent},
  {path:'**',redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColoresRoutingModule { }
