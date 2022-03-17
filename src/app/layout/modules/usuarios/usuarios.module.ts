import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { TiendaComponent } from '../../tienda/tienda.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';


@NgModule({
  declarations: [
    MainComponent,
    TiendaComponent,
    PerfilComponent,
    ListarUsuarioComponent,
    TablaUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UsuariosModule { }
