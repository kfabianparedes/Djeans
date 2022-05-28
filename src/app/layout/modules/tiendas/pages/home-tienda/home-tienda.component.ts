import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Sucursal } from '../../../sucursales/models/sucursal.model';
import { SucursalService } from '../../../sucursales/services/sucursal.service';
import { DataTiendaRegistroActualizar } from '../../models/registro-actualizar-tienda';
import { Tienda } from '../../models/tienda.models';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-home-tienda',
  templateUrl: './home-tienda.component.html',
  styleUrls: ['./home-tienda.component.css'],
  providers:[MessageService]
})
export class HomeTiendaComponent implements OnInit , OnDestroy{
  public sucursalesModal: Sucursal[] = [];
  public tiendas:Tienda[]=[];
  public mostrarModal:boolean=false;
  public tituloModal:string='';
  public tiendaParaActualizar:Tienda={} as Tienda;

  constructor(
    private tiendaService:TiendaService,
    public messageService:MessageService,
    private _sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this._listarTiendasConSucursal();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarTiendas():void{
    this.tiendas=[];
    this.tiendaService.listarTiendas().subscribe({
      next:(respuesta:Respuesta)=>{
        (respuesta.data).forEach((tienda:Tienda)=>{
          this.tiendas.push({
            ...tienda,
            tiendaEstado:tienda.tie_estado?'ACTIVO':'INACTIVO'
          })
        });
      },
      error:(respuestaError:HttpErrorResponse)=>{
        const respuesta:Respuesta={...respuestaError.error};
        const codigoHttp:number=respuestaError.status;
        if(codigoHttp!==0){
          errorAlerta(respuesta.code.toString(),respuesta.message);
        }else{
          errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
        }
      }
    });
  }

  public eliminarTienda(idTienda:number):void{
    this.tiendaService.eliminarTienda(idTienda).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Excelente',
            detail:respuesta.message
          });
          this._listarTiendasConSucursal();
        },
        error:(respuestaError:HttpErrorResponse)=>{
          const respuesta:Respuesta={...respuestaError.error};
          const codigoHttp:number=respuestaError.status;

          if(codigoHttp!==0){
            this.messageService.add({
              severity:'error',
              summary:`Codigo de error: ${respuesta.code}`,
              detail:respuesta.message
            });
          }else{
            errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
          }
        }
      }
    );
  }

  public guardarTienda({esRegistro,tienda}:DataTiendaRegistroActualizar):void{
    if(esRegistro){
      this._registrarTienda(tienda);
    }else{
      this._actualizarTienda(tienda);
    }
  }

  private _actualizarTienda(tienda:Tienda):void{
    this.tiendaService.actualizarTienda(tienda).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Actualizado...',
            detail:respuesta.message
          });
          this._listarTiendasConSucursal();
        },
        error:(respuestaError:HttpErrorResponse)=>{
          const respuesta:Respuesta={...respuestaError.error};
          const codigoHttp:number=respuestaError.status;
          if(codigoHttp!==0){
            this.messageService.add({
              severity:'error',
              summary:`Codigo de error.${respuesta.code}`,
              detail:respuesta.message
            });
          }else{
            errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
          }
        }
      }
    );
  }

  private _registrarTienda(tienda:Tienda):void{
    this.tiendaService.registrarTienda(tienda).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Registrado...',
            detail:respuesta.message
          });
          this._listarTiendasConSucursal();
        },
        error:(respuestaError:HttpErrorResponse)=>{
          const respuesta:Respuesta={...respuestaError.error};
          const codigoHttp:number=respuestaError.status;
          if(codigoHttp!==0){
            this.messageService.add({
              severity:'error',
              summary:`Codigo de error: ${respuesta.code}`,
              detail:respuesta.message
            });
          }else{
            errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
          }
        }
      }
    );
  }

  public guardarTituloModal(tituloDelModal : string): void{
    this.tituloModal= tituloDelModal;
  }

  public modificarEstadoModal(estadoModal: boolean): void {
    this.mostrarModal = estadoModal;
  }

  public guardarTiendaParaActualizar( tienda: Tienda): void{
    this.tiendaParaActualizar = {...tienda};
  }

  private infoTiendaSucursal: Subscription = new Subscription;
  private _listarTiendasConSucursal(): void {
    this.sucursalesModal = [] as Sucursal [];
    this.tiendas = [] as Tienda[];

    this.infoTiendaSucursal = forkJoin([this._sucursalService.listarSucursales() ,this.tiendaService.listarTiendas()]).subscribe(
      {
        next: (respuestas: Respuesta[])=>{
          const sucursalesData = [...respuestas[0].data];
          const tiendasData = [...respuestas[1].data];

          (tiendasData).forEach((tienda:Tienda)=>{
            (sucursalesData).forEach((sucursal:Sucursal)=>{
              if(tienda.tie_suc_id === sucursal.suc_id){
                this.tiendas.push({
                  ...tienda,
                  tiendaEstado:tienda.tie_estado?'ACTIVO':'INACTIVO',
                  sucursal: sucursal.suc_nombre,
                  sucursalDireccion: sucursal.suc_direccion
                })
              }
            });
          });

          ([...sucursalesData]).forEach((sucursal:Sucursal)=>{
            this.sucursalesModal.push({
              ...sucursal,
              sucursalEstado:sucursal.suc_estado?'ACTIVO':'INACTIVO'
            })
          });


        },
        error:(respuestaError:HttpErrorResponse)=>{
        const respuesta:Respuesta={...respuestaError.error};
        const codigoHttp:number=respuestaError.status;
        if(codigoHttp!==0){
          this.messageService.add({
            severity:'error',
            summary:`Codigo de error.${respuesta.code}`,
            detail:respuesta.message
          });
        }else{
          errorAlerta('Error en el servidor',AuthService.mensajeErrorDelServidor);
        }
      }
      }
    );
  }

  ngOnDestroy(): void {
    this.infoTiendaSucursal.unsubscribe();
  }

}
