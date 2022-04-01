import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';
import { SubtituloPaginaComponent } from './components/subtitulo-pagina/subtitulo-pagina.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';

//PrimeNg
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { TagModule  } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TituloPaginaComponent,
    ErrorComponent,
    ProgressbarComponent,
    SubtituloPaginaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    //PrimeNg
    TableModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    BadgeModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TituloPaginaComponent,
    ErrorComponent,
    ProgressbarComponent,
    SubtituloPaginaComponent,
    //PrimeNg
    TableModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    BadgeModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ]
})
export class SharedModule { }
