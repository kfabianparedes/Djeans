import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { DataSucursalRegistroActualizar } from '../../models/registro-actualizar-sucursal.model';
import { Sucursal } from '../../models/sucursal.model';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-home-sucursal',
  templateUrl: './home-sucursal.component.html',
  styleUrls: ['./home-sucursal.component.css'],
  providers:[MessageService]
})
export class HomeSucursalComponent implements OnInit {

  public sucursales:Sucursal[]=[];
  public mostrarModal:boolean=false;
  public tituloModal:string='';
  public sucursalParaActualizar:Sucursal={} as Sucursal;

  constructor(
    private sucursalService:SucursalService,
    public messageService:MessageService
  ) { }

  ngOnInit(): void {
    this._listarSucursales();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  public _listarSucursales():void{
    this.sucursales=[];
    this.sucursalService.listarSucursales().subscribe({
      next:(respuesta:Respuesta)=>{
        (respuesta.data).forEach((sucursal:Sucursal)=>{
          this.sucursales.push({
            ...sucursal,
            sucursalEstado:sucursal.suc_estado?'ACTIVO':'INACTIVO'
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

  public eliminarSucursal(idSucursal:number):void{
    this.sucursalService.eliminarSucursal(idSucursal).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Excelente',
            detail:respuesta.message
          });
          this._listarSucursales();
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

  public guardarSucursal({esRegistro,sucursal}:DataSucursalRegistroActualizar):void{
    if(esRegistro){
      this._registrarSucursal(sucursal);
    }else{
      this._actualizarSucursal(sucursal);
    }
  }

  private _actualizarSucursal(sucursal:Sucursal):void{
    this.sucursalService.actualizarSucursal(sucursal).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Actualizado...',
            detail:respuesta.message
          });
          this._listarSucursales();
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

  private _registrarSucursal(sucursal:Sucursal):void{
    this.sucursalService.registrarSucursal(sucursal).subscribe(
      {
        next:(respuesta:Respuesta)=>{
          this.messageService.add({
            severity:'success',
            summary:'Registrado...',
            detail:respuesta.message
          });
          this._listarSucursales();
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

  public guardarSucursalParaActualizar( sucursal: Sucursal): void{
    this.sucursalParaActualizar = {...sucursal};
  }
}
