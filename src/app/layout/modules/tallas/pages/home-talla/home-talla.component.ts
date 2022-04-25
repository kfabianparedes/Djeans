import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import {Talla} from '../../models/talla.models' 
import {TallaService} from '../../services/talla.service';
import { DataTallaRegistroActualizar } from '../../models/registro-actualizar-talla.model';

@Component({
  selector: 'app-home-talla',
  templateUrl: './home-talla.component.html',
  styleUrls: ['./home-talla.component.css'],
  providers: [MessageService]
})
export class HomeTallaComponent implements OnInit {

  public tallas:Talla[] = [] ; 
  public mostrarModal: boolean = false; 
  public tituloModal: string = ''; 
  public tallaParaActualizar: Talla = {} as Talla ;


  constructor(
    private tallaService : TallaService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._listarTallas();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarTallas() : void {

    this.tallas = [] ;
    this.tallaService.listarTallas().subscribe({  
      next: (respuesta: Respuesta) =>{

        (respuesta.data).forEach((talla:Talla) => {
          this.tallas.push({
              ...talla,
              tallaEstado:talla.tal_estado?'ACTIVO':'INACTIVO'
            }
          )
        });
      },
      error: (respuestaError: HttpErrorResponse)=>{
        const respuesta : Respuesta = {...respuestaError.error};
        const codigoHttp : number = respuestaError.status; 
        if (codigoHttp !== 0){
          errorAlerta(respuesta.code.toString(), respuesta.message);
        } else{
          errorAlerta(' Error en el servidor ', AuthService.mensajeErrorDelServidor);
        }
      
      }
    });
  }

  public eliminarTalla(idTalla : number ) : void {
    this.tallaService.eliminarTalla(idTalla).subscribe({
      next: (respuesta:Respuesta) =>{
        this.messageService.add({
          severity:'success',
          summary:'Excelente',
          detail:respuesta.message
        });
        this._listarTallas();
      },
      error:(respuestaError: HttpErrorResponse)=>{
        const respuesta : Respuesta = {...respuestaError.error};
        const codigoHttp : number = respuestaError.status ; 

        if(codigoHttp !== 0){
          this.messageService.add({
            severity:'error',
            summary:`Código de error: ${respuesta.code}`,
            detail:respuesta.message
          });
        }else{
          errorAlerta('Error en el servidor', AuthService.mensajeErrorDelServidor);
        }
      }
    });
  }
  
  public guardarTalla({esRegistro, talla}:DataTallaRegistroActualizar) : void {
    if (esRegistro){
      this._registrarTalla(talla);

    }else {
      this._actualizarTalla(talla); 
    }
  }

  private _actualizarTalla(talla : Talla) : void {
    this.tallaService.actualizarTalla(talla).subscribe({
      next: (respuesta : Respuesta) =>{
        this.messageService.add(
          {
            severity:'success',
            summary:'Actualizado...',
            detail: respuesta.message
          }
        );
        this._listarTallas();
      },
      error : (respuestaError : HttpErrorResponse) =>{
        const respuesta : Respuesta = {...respuestaError.error}
        const codigoHttp : number = respuestaError.status;
        if (codigoHttp !== 0 ){
          this.messageService.add({
            severity:'error',
            summary:`Código de error: ${respuesta.code}`,
            detail : respuesta.message
          });
        }else {
          console.error('Error en el servidor' , AuthService.mensajeErrorDelServidor);
          
        }
      }
    });
  }

  private _registrarTalla(talla: Talla) : void {
    this.tallaService.registrarTalla(talla).subscribe({
      next: (respuesta : Respuesta) =>{
        this.messageService.add(
          {
            severity:'success',
            summary:'Resgistrando...',
            detail: respuesta.message
          }
        );
        this._listarTallas();
      },
      error : (respuestaError : HttpErrorResponse) =>{
        const respuesta : Respuesta = {...respuestaError.error}
        const codigoHttp : number = respuestaError.status;
        if (codigoHttp !== 0 ){
          this.messageService.add({
            severity:'error',
            summary:`Código de error: ${respuesta.code}`,
            detail : respuesta.message
          });
        }else {
          console.error('Error en el servidor' , AuthService.mensajeErrorDelServidor);
          
        }
      }
    });
  }

  public guardarTituloModal(tituloDelModal : string) : void {
    this.tituloModal = tituloDelModal
  }
  public modificarEstadoModal(estadoModal : boolean) : void{
    this.mostrarModal = estadoModal ; 
  }
  public guardarTallaParaActualizar( talla: Talla) : void {
    this.tallaParaActualizar = {...talla};
  }

}
