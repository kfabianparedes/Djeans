import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { DataTiendaRegistroActualizar } from '../../models/registro-actualizar-tienda';
import { Tienda } from '../../models/tienda.models';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-home-tienda',
  templateUrl: './home-tienda.component.html',
  styleUrls: ['./home-tienda.component.css'],
  providers:[MessageService]
})
export class HomeTiendaComponent implements OnInit {

  public tiendas:Tienda[]=[];
  public mostrarModal:boolean=false;
  public tituloModal:string='';
  public tiendaParaActualizar:Tienda={} as Tienda;

  constructor(
    private tiendaService:TiendaService,
    public messageService:MessageService
  ) { }

  ngOnInit(): void {
    this._listarTiendas();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  public _listarTiendas():void{
    this.tiendas=[];
    this.tiendaService.listarTiendas().subscribe({
      next:(respuesta:Respuesta)=>{
        (respuesta.data).forEach((tienda:Tienda)=>{
          console.log(tienda);
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
          this._listarTiendas();
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

  public guardarSucursal({esRegistro,tienda}:DataTiendaRegistroActualizar):void{
    if(esRegistro){
      console.log('Registrar');
      this._registrarSucursal(tienda);
    }else{
      console.log('actualizar');
      this._actualizarSucursal(tienda);
    }
  }

  private _actualizarSucursal(tienda:Tienda):void{
    console.log('actualizar Tienda: ');
    console.log(tienda);
    this.tiendaService.actualizarTienda(tienda).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Actualizado...',
            detail:respuesta.message
          });
          this._listarTiendas();
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

  private _registrarSucursal(tienda:Tienda):void{
    console.log('nuevo Tienda');
    console.log(tienda);
    this.tiendaService.registrarTienda(tienda).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Registrado...',
            detail:respuesta.message
          });
          this._listarTiendas();
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



}
