import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Proveedor } from '../../models/proveedor.model';
import { DataProveedorRegistroActualizar } from '../../models/registro-actualizar-proveedor.model';
import { ProveedorService } from '../../services/proveedor.service';


@Component({
  selector: 'app-home-proveedor',
  templateUrl: './home-proveedor.component.html',
  styleUrls: ['./home-proveedor.component.css'],
  providers: [MessageService]
})
export class HomeProveedorComponent implements OnInit {

  public proveedores : Proveedor[] = [] ;
  public mostrarModal : boolean = false ; 
  public esVisualizar : boolean = false ;
  public tituloModal : string = '' ;
  public proveedorParaActualizar : Proveedor = {} as Proveedor ; 
  
  constructor(
    private proveedorService : ProveedorService, 
    public messageService : MessageService
  ) { }

  ngOnInit(): void {
    this._listarProveedores();
    
  }

  private _listarProveedores() : void {
    this.proveedores = [];
    this.proveedorService.listarModelos().subscribe({
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

  public closeAlert(): void{
    this.messageService.clear();
  }

  public eliminarProveedor(idProveedor : number) : void {
    this.proveedorService.eliminarModelo(idProveedor).subscribe({
      next: (respuesta:Respuesta)=>{

        this.messageService.add({
          severity:'success', 
          summary: 'Excelente', 
          detail: respuesta.message
        });
        
        this._listarProveedores();
        
      },error: (respuestaError:HttpErrorResponse)=>{
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
    });
  }

  private _registrarProveedor(proveedor : Proveedor):void{
    console.log(proveedor);
    
    this.proveedorService.registrarProveedor(proveedor).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          
          this._listarProveedores();
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

  private _actualizarProveedor(proveedor : Proveedor):void{
    
    this.proveedorService.actualizarProveedor(proveedor).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizado...', 
            detail: respuesta.message
          });
          
          this._listarProveedores();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
          console.log(codigoHttp);
          if(codigoHttp !== 0){
            
            codigoHttp===403?
              errorAlerta(`${respuesta.code}`, respuesta.message ):
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

  public guardarProveedor({esRegistro, proveedor}: DataProveedorRegistroActualizar ): void {
    if(!this.esVisualizar){

      if( esRegistro ){
        this._registrarProveedor(proveedor);
      }else{
        this._actualizarProveedor(proveedor);
      }

    }else{

      this.messageService.add({
        severity:'error', 
        summary: 'Peligro', 
        detail: 'No se puede realizar esta actividad.'
      });

    }
  }

  public guardarTituloModal(tituloDelModal : string): void{
    this.tituloModal= tituloDelModal;
  }

  public modificarEstadoModal(estadoModal: boolean): void {
    this.mostrarModal = estadoModal;
  }
  public modificarEstadoVisualizar(esVisualizar : boolean) : void {
    this.esVisualizar = esVisualizar ; 
  }

  public guardarProveedorParaActualizar( proveedor: Proveedor): void{ 
    this.proveedorParaActualizar = {...proveedor};
  }

  public visualizarProveedor( esVisualizar: boolean) : void{
    this.esVisualizar = esVisualizar ;
  }
}
