import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/pages/error/error.component';

const routes: Routes = [
  { path: '', loadChildren: ()=> import('./auth/auth.module').then( m=>m.AuthModule ) },
  { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path:'',redirectTo:'',pathMatch:'full' },
  { path:'not-found',component: ErrorComponent },
  { path:'**',redirectTo:'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
