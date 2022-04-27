import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Categoria } from '../../models/categoria.model';
import { DataCategoriaRegistroActualizar } from '../../models/registro-actualizar-categoria.model';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.css'],
  providers: [MessageService]
})

export class HomeCategoriaComponent implements OnInit {

  public categorias: Categoria[] = [];
  public mostrarModal: boolean = false;
  public tituloModal: string = '';
  public categoriaParaActualizar: Categoria = {} as Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._listarCategorias();
  }

  public closeAlert(): void {
    this.messageService.clear();
  }

  private _listarCategorias(): void{
    this.categorias = [];
    this.categoriaService.listarCategorias().subscribe({
      next: (respuesta: Respuesta)=>{
        (respuesta.data).forEach((categoria: Categoria) => {
          this.categorias.push({
            ...categoria, 
            categoriaEstado: categoria.cat_estado?'ACTIVO':'INACTIVO'
          })
        });
      },
      error: (respuestaError:HttpErrorResponse) => {
        const respuesta: Respuesta = {...respuestaError.error};
        const codigoHttp : number = respuestaError.status;
        if(codigoHttp !== 0){
          errorAlerta( `${respuesta.code}`, respuesta.message );
        }else{
          errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
        }
      }

    });
  }

  public eliminarCategoria(idCategoria : number){
    this.categoriaService.eliminarCategoria(idCategoria).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Excelente', 
            detail: respuesta.message
          });
          
          this._listarCategorias();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
  
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
  
  public guardarCategoria({esRegistro, categoria}: DataCategoriaRegistroActualizar ): void {
    if( esRegistro ){
      this._registrarCategoria(categoria);
    }else{
      this._actualizarCategoria(categoria);
    }
  }

  private _actualizarCategoria(categoria : Categoria): void {
    console.log( 'actualizar categoria: ' );
    console.log( categoria );
    this.categoriaService.actualizarCategoria(categoria).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizado...', 
            detail: respuesta.message
          });
          
          this._listarCategorias();
        },
        error: (respuestaError:HttpErrorResponse) => {
          const respuesta: Respuesta = {...respuestaError.error};
          const codigoHttp : number = respuestaError.status;
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

  private _registrarCategoria(categoria : Categoria): void {
    
    console.log( 'nueva categoria: ' );
    console.log( categoria );
    this.categoriaService.registrarCategoria(categoria).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          
          this._listarCategorias();
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

  public guardarTituloModal(tituloDelModal : string): void {
    this.tituloModal= tituloDelModal;
  }

  public modificarEstadoModal(estadoModal: boolean): void {
    this.mostrarModal = estadoModal;
  }

  public guardarCategoriaParaActualizar( categoria:   Categoria): void { 
    this.categoriaParaActualizar = {...categoria};
  }

  
}
