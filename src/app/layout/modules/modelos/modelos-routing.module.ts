import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModeloComponent } from './pages/home-modelo/home-modelo.component';

const routes: Routes = [
  { path: '', component: HomeModeloComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelosRoutingModule { }
