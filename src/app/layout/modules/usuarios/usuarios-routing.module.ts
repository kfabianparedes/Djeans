import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path:'', component: HomeUsuarioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
