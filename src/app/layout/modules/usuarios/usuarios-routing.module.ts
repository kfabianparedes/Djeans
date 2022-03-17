import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {path:'perfil',component: PerfilComponent},
      {path:'listar',component: ListarUsuarioComponent},
      {path:'',redirectTo:'listar'},
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
