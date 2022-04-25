import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTallaComponent } from './pages/home-talla/home-talla.component';

const routes: Routes = [
  {path: '',component: HomeTallaComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallasRoutingModule { }
