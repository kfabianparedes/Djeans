import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {
    path:'',
    component: HomeUsuarioComponent,
    children: [
      {path:'perfil',component: PerfilComponent},
      {path:'listar',component: ListarUsuarioComponent},
      {path:'',redirectTo:'listar'},
      {path:'**',redirectTo:'listar'},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
