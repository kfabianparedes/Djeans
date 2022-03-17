import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';

//PrimeNg
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ProgressBarModule} from 'primeng/progressbar';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import {BadgeModule} from 'primeng/badge';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TituloPaginaComponent,
    ErrorComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    //PrimeNg
    TableModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    BadgeModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TituloPaginaComponent,
    ErrorComponent,
    ProgressbarComponent,

    //PrimeNg
    TableModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    BadgeModule

  ]
})
export class SharedModule { }
