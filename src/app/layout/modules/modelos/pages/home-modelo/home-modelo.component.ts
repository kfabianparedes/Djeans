import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Modelo } from '../../models/modelo.model';
import { DataModeloRegistroActualizar } from '../../models/registro-actualizar-modelo.model';
import { ModeloService } from '../../services/modelo.service';

@Component({
  selector: 'app-home-modelo',
  templateUrl: './home-modelo.component.html',
  styleUrls: ['./home-modelo.component.css'],
  providers: [MessageService]
})
export class HomeModeloComponent implements OnInit {
  public modelos: Modelo[] = [];
  public mostrarModal: boolean = false;
  public tituloModal: string = '';
  public modeloParaActualizar: Modelo = {} as Modelo;

  constructor(
    private modeloService:ModeloService,
    public messageService: MessageService

    ) { }

  ngOnInit(): void {
    this._listarModelos();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarModelos(): void{
    this.modelos = [];
    this.modeloService.listarModelos().subscribe({
      next: (respuesta: Respuesta)=>{
        
        (respuesta.data).forEach((modelo: Modelo) => {
          console.log(modelo);
          this.modelos.push({
            ...modelo, 
            modeloEstado: modelo.mod_estado?'ACTIVO':'INACTIVO'
          })
        });
      },
      error: (respuestaError:HttpErrorResponse) => {
        const respuesta: Respuesta = {...respuestaError.error};
        const codigoHttp : number = respuestaError.status;
        if(codigoHttp !== 0){
          errorAlerta( respuesta.code.toString(), respuesta.message );
        }else{
          errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
        }
      }

    });
  }

  

  public eliminarModelo(idModelo : number): void {
    this.modeloService.eliminarModelo(idModelo).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Excelente', 
            detail: respuesta.message
          });
          
          this._listarModelos();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
  
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error', 
              summary: `Código de error: ${respuesta.code}`, 
              detail: respuesta.message
            });
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  public guardarModelo({esRegistro, modelo}: DataModeloRegistroActualizar ): void {
    if( esRegistro ){
      console.log('registrar');
      this._registrarModelo(modelo);
    }else{
      console.log('actualizar');
      this._actualizarModelo(modelo);
    }
  }

  private _actualizarModelo(modelo : Modelo): void {
    console.log( 'actualizar Modelo: ' );
    console.log( modelo );
    this.modeloService.actualizarModelo(modelo).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizado...', 
            detail: respuesta.message
          });
          
          this._listarModelos();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error', 
              summary: `Código de error: ${respuesta.code}`, 
              detail: respuesta.message
            });
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  private _registrarModelo(modelo : Modelo): void {
    console.log( 'nueva Modelo: ' );
    console.log( modelo );
    this.modeloService.registrarModelo(modelo).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          
          this._listarModelos();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error', 
              summary: `Código de error: ${respuesta.code}`, 
              detail: respuesta.message
            });
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
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

  public guardarModeloParaActualizar( modelo: Modelo): void{ 
    this.modeloParaActualizar = {...modelo};
  }
}
