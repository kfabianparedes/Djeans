import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { FiltrarPorUsernamePipe } from './pipes/filtrar-por-username.pipe';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';


@NgModule({
  declarations: [
    HomeUsuarioComponent,
    PerfilComponent,
    TablaUsuarioComponent,
    ModalUsuarioComponent,
    FiltrarPorUsernamePipe,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
