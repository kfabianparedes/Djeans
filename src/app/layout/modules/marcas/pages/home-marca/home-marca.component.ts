import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Marca } from '../../models/marca';
import { DataMarcaRegistroActualizar } from '../../models/registro_actualizar_marca.model';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-home-marca',
  templateUrl: './home-marca.component.html',
  styleUrls: ['./home-marca.component.css'],
  providers: [MessageService]
})
export class HomeMarcaComponent implements OnInit {
  public marcas: Marca[] = [];
  public mostrarModal: boolean = false;
  public tituloModal: string = '';
  public marcaParaActualizar: Marca = {} as Marca;

  constructor(
    private marcaService : MarcaService,
    public messageService: MessageService
    ) { }

  ngOnInit(): void {
    this._listarMarcas();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _listarMarcas(): void{
    this.marcas = [];
    this.marcaService.listarMarcas().subscribe({

      next: (respuesta: Respuesta)=>{
        (respuesta.data).forEach((marca: Marca) => {
          this.marcas.push({
            ...marca, 
            marcaEstado: marca.mar_estado?'ACTIVO':'INACTIVO'
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

  public eliminarMarca(idMarca : number): void {
    this.marcaService.eliminarMarca(idMarca).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Excelente', 
            detail: respuesta.message
          });
          
          this._listarMarcas();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
  
          if(codigoHttp !== 0){
            
            codigoHttp===403?
              errorAlerta(`${respuesta.code}`, respuesta.message ):
              this.messageService.add({
                severity:'error', 
                summary: `C??digo de error: ${respuesta.code}`, 
                detail: respuesta.message
              });
              
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  public guardarMarca({esRegistro, marca}: DataMarcaRegistroActualizar ): void {
    if( esRegistro ){
      this._registrarMarca(marca);
    }else{
      this._actualizarMarca(marca);
    }
  }

  private _actualizarMarca(marca : Marca): void {
    this.marcaService.actualizarMarca(marca).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizado...', 
            detail: respuesta.message
          });
          
          this._listarMarcas();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            
            codigoHttp===403?
              errorAlerta(`${respuesta.code}`, respuesta.message ):
              this.messageService.add({
                severity:'error', 
                summary: `C??digo de error: ${respuesta.code}`, 
                detail: respuesta.message
              });
              
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  private _registrarMarca(marca : Marca): void {
    this.marcaService.registrarMarca(marca).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          
          this._listarMarcas();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          if(codigoHttp !== 0){
            this.messageService.add({
              severity:'error', 
              summary: `C??digo de error: ${respuesta.code}`, 
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

  public guardarMarcaParaActualizar( marca: Marca): void{ 
    this.marcaParaActualizar = {...marca};
  }





}
