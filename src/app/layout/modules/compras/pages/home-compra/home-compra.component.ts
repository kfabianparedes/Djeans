import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ProveedorService } from '../../../proveedores/services/proveedor.service';

@Component({
  selector: 'app-home-compra',
  templateUrl: './home-compra.component.html',
  styleUrls: ['./home-compra.component.css'],
  providers: [MessageService]
})
export class HomeCompraComponent implements OnInit , OnDestroy{

  public proveedores: Proveedor[] = [];

  constructor(
    public rolPermissionService: RolPermissionService,
    public messageService: MessageService,
    private _proveedorService: ProveedorService
  ) { }
  

  ngOnInit(): void {
    this._listarProveedores();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _suscripcionProveedores: Subscription = new Subscription;
  private _listarProveedores() : void {
    this.proveedores = [];
    this._suscripcionProveedores = this._proveedorService.listarProveedores().subscribe({
      next: (respuesta:Respuesta)=>{

        (respuesta.data).forEach((proveedor:Proveedor)=>{

          this.proveedores.push({
            ...proveedor,
            proveedorEstado: proveedor.pro_estado?'ACTIVO':'INACTIVO'
          })
        });
        console.log(this.proveedores);
      },error: (respuestaError:HttpErrorResponse)=>{

        const respuesta : Respuesta = { ...respuestaError.error }
        const codigoHttp : number = respuestaError.status; 
        if(codigoHttp !== 0){
          errorAlerta( respuesta.code.toString(), respuesta.message);
        }else{
          errorAlerta( 'Error en el servidor', AuthService.mensajeErrorDelServidor);
        }
      }
    });
  }







  ngOnDestroy(): void {
    this._suscripcionProveedores.unsubscribe();
  }
}
