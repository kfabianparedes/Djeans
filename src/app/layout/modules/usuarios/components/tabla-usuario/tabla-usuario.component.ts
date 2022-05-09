import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Usuario } from '../../models/usuario.model';
import { Roles } from '../../utils/Roles.model';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuariosDeTabla: Usuario[] = [];
  @Output() usuarioEliminado = new EventEmitter<number>();

  //Variable boton en carga
  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  //Variables tabla
  public filtroBusquedaUsuario: string = '';
  
  @Output() abrirModal = new EventEmitter<boolean>();
  @Output() tituloModal = new EventEmitter<string>();
  @Output() usuarioParaActualizar = new EventEmitter<Usuario>();

  constructor(private _buttonProgressService: ButtonProgressService){ }

  ngOnInit(): void {
  }

  public registroUsuario() : void {
    this.tituloModal.emit('Registrar Nuevo Usuario');
    this.abrirModal.emit(true);
  }

  public actualizarUsuario( usuario:Usuario ): void {
    this.tituloModal.emit('Actualizar Usuario');
    this.abrirModal.emit(true);
    this.usuarioParaActualizar.emit(usuario);
  }

  public eliminarUsuario(idUsuario: number): void {
    this.usuarioEliminado.emit(idUsuario);
  }

  public reiniciarTabla(tabla: Table): void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla: Table): void {
    tabla?.filterGlobal(this.filtroBusquedaUsuario, 'contains');
  }

  public obtenerColorDelRolDeUsuario(tipoDeUsuario: string):string{
    return tipoDeUsuario == Roles.superuser?
      'warning':tipoDeUsuario == Roles.admin?
      'success':tipoDeUsuario == Roles.employee?
      'primary':'danger';

  }

}
