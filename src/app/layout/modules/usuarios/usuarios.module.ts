import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TiendaComponent } from '../../tienda/tienda.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { FiltrarPorUsernamePipe } from './pipes/filtrar-por-username.pipe';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';


@NgModule({
  declarations: [
    HomeUsuarioComponent,
    TiendaComponent,
    PerfilComponent,
    ListarUsuarioComponent,
    TablaUsuarioComponent,
    ModalUsuarioComponent,
    FiltrarPorUsernamePipe,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UsuariosModule { }
