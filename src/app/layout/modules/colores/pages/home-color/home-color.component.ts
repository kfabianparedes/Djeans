import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import {Color} from '../../models/color.model' ; 
import { DataColorRegistroActualizar } from '../../models/registro-actualizar-color.model'; 
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-home-color',
  templateUrl: './home-color.component.html',
  styleUrls: ['./home-color.component.css'],
  providers: [MessageService]
})
export class HomeColorComponent implements OnInit {

  public colores: Color [] = [] ;; 
  public mostrarModal : boolean = false ;
  public tituloModal : string = '';
  public colorParaActualizar : Color = {} as Color; 

  constructor(
    private colorService : ColorService,
    public messageService : MessageService
    ) { }

  ngOnInit(): void {
    this._listarColores();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarColores() : void {

    this.colores = [] ; 

    this.colorService.listarColores().subscribe(
      {
        next: (respuesta : Respuesta) =>{

          (respuesta.data).forEach((color:Color) => {
            this.colores.push({
              ...color,
              colorEstado:color.col_estado?'ACTIVO':'INACTIVO'
            })
          });
        },error: (respuestaError: HttpErrorResponse)=>{
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status ; 
          if (codigoHttp !== 0 ){
            errorAlerta(respuesta.code.toString(), respuesta.message);
          }else {
            errorAlerta(' Error en el servidor ', AuthService.mensajeErrorDelServidor)
          }
        }
      }
    );
  }

  public guardarColor({esRegistro, color}:DataColorRegistroActualizar) : void {
    if (esRegistro){
      this._registrarColor(color);
    }else{
      this._actualizarColor(color) ; 
    }

  }
  public _registrarColor(color:Color) : void {
    this.colorService.registrarColor(color).subscribe({
      next: (respuesta : Respuesta) =>{
        this.messageService.add(
          {
            severity:'success',
            summary:'Resgistrando...',
            detail: respuesta.message
          }
        );
        this._listarColores();
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

  public _actualizarColor(color: Color) : void {
    this.colorService.actualizarColor(color).subscribe({
      next: (respuesta : Respuesta) =>{
        this.messageService.add(
          {
            severity:'success',
            summary:'Actualizado...',
            detail: respuesta.message
          }
        );
        this._listarColores();
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

  public _eliminarColor(col_id : number) : void {
    this.colorService.eliminarColor(col_id).subscribe(
      {
        next: (respuesta : Respuesta) => {
          this.messageService.add({
            severity:'success',
            summary:'Excelente',
            detail:respuesta.message
          });
          this._listarColores();

        },error: (respuestaError: HttpErrorResponse) =>{
          const respuesta : Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status; 
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error',
              summary:`Código de error: ${ respuesta.code }`,
              detail:respuesta.message
            });
          }else {
            errorAlerta('Error en el servidor', AuthService.mensajeErrorDelServidor);
          }

        } 
      }
    );
  }

  public guardarTituloModal(tituloDelModal : string) : void {
    this.tituloModal = tituloDelModal
  }
  public modificarEstadoModal(estadoModal : boolean) : void{
    this.mostrarModal = estadoModal ; 
  }
  public guardarColorParaActualizar( color: Color) : void {
    this.colorParaActualizar = {...color};
  }

}
