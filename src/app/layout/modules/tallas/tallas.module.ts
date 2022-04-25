import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TallasRoutingModule } from './tallas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeTallaComponent } from './pages/home-talla/home-talla.component';
import { ModalTallaComponent } from './components/modal-talla/modal-talla.component';
import { TablaTallaComponent } from './components/tabla-talla/tabla-talla.component';


@NgModule({
  declarations: [
    HomeTallaComponent,
    ModalTallaComponent,
    TablaTallaComponent

  ],
  imports: [
    CommonModule,
    TallasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TallasModule { }
