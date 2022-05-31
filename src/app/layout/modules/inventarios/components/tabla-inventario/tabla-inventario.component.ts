import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { Inventario } from '../../models/inventario.models';
@Component({
  selector: 'tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.css']
})
export class TablaInventarioComponent implements OnInit {

  @Input() inventariosTabla :Inventario[] = [] ; 

  public cargando : Subject<boolean> = this._buttonProgressService.cargando ;
  public filtroBusquedaInventario: string = '' ;

  constructor(
    public rolPermissionService: RolPermissionService,
    private _buttonProgressService: ButtonProgressService) { }

  ngOnInit(): void {
  }

  public reiniciarTabla(tabla: Table) : void {
    tabla?.reset();
  }

  public filtrarBusqueda(tabla:Table) : void {
    tabla?.filterGlobal(this.filtroBusquedaInventario,'contains');
  }

}
