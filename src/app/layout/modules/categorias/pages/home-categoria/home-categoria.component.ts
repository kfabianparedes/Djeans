import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta, validarCodigosDeErrorDelAPI } from 'src/app/shared/utils/reutilizables';
import { Categoria } from '../../models/categoria.model';
import { DataRegistroActualizar } from '../../models/data-registro-actualizar';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.css'],
  providers: [MessageService]
})



export class HomeCategoriaComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._listarCategorias();
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
      error: (respuesta:HttpErrorResponse) => {
        if(respuesta.status !== 0){
          if(validarCodigosDeErrorDelAPI(respuesta.error['code']))
            errorAlerta(respuesta.error['code'],respuesta.error.message)
        }else{
          errorAlerta('Error en el servidor', AuthService.mensajeErrorDelServidor)
        }
      }

    });
  }

  public eliminarCategoria(idCategoria : number){
    this.categorias = [];
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
            errorAlerta( respuesta.code.toString() , respuesta.message );
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );

  }

  
  public guardarCategoria({esRegistro, categoria}: DataRegistroActualizar ): void {
    console.log(esRegistro);
    console.log(categoria);

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
            this.messageService.add({
              severity:'error', 
              summary: `${respuesta.code}`, 
              detail: respuesta.message
            });
            // errorAlerta( respuesta.code.toString() , respuesta.message );
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
              summary: `${respuesta.code}`, 
              detail: respuesta.message
            });
            // errorAlerta( respuesta.code.toString() , respuesta.message );
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  public closeAlert(): void {
    this.messageService.clear();
  }
}
