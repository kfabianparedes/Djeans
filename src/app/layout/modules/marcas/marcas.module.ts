import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasRoutingModule } from './marcas-routing.module';
import { HomeMarcaComponent } from './pages/home-marca/home-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeMarcaComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MarcasModule { }
