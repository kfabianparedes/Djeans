import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';

//PRODUCTO
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

//MODELO
import { Modelo } from '../../../modelos/models/modelo.model';
import { ModeloService } from '../../../modelos/services/modelo.service';

//CATEGORIA
import { Categoria } from '../../../categorias/models/categoria.model';
import { CategoriaService } from '../../../categorias/services/categoria.service';

//COLOR
import { Color } from '../../../colores/models/color.model';
import { ColorService } from '../../../colores/services/color.service';

//TALLA
import { Talla } from '../../../tallas/models/talla.models';
import { TallaService } from '../../../tallas/services/talla.service';

//PROVEEDOR
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ProveedorService } from '../../../proveedores/services/proveedor.service';

// MARCAR
import { Marca } from '../../../marcas/models/marca';
import { MarcaService } from '../../../marcas/services/marca.service';

import { DataProductoRegistroActualizar } from '../../models/registro-actualizar-producto.model';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-producto',
  templateUrl: './home-producto.component.html',
  styleUrls: ['./home-producto.component.css']
})
export class HomeProductoComponent implements OnInit {

  public productos : Producto[] = [] ;
  public proveedores : Proveedor[] = [] ;
  public categorias : Categoria[] = [] ;
  public modelos : Modelo[] = [] ;
  public marcas : Marca[] = [] ;
  public colores : Color[] = [] ;
  public tallas : Talla[] = [] ;
  public mostrarModal : boolean = false ; 
  public esVisualizar : boolean = false ;
  public tituloModal : string = '' ;
  public productoParaActualizar : Producto = {} as Producto ; 

  constructor(
    private productoService : ProductoService, 
    private tallaService : TallaService, 
    private modeloService : ModeloService, 
    private proveedorService : ProveedorService, 
    private colorService : ColorService, 
    private marcaService : MarcaService, 
    private categoriaService : CategoriaService, 
    public messageService : MessageService
  ) { }

  ngOnInit(): void {
   this._listAll();
  }

  private _listarProductos() : void {
    this.productos = [] ; 
    this.productoService.listarProductos().subscribe({
      next: (respuesta:Respuesta)=>{

        (respuesta.data).forEach((producto:Producto)=>{

          this.productos.push({
            ...producto,
            productoEstado: producto.prod_estado?'ACTIVO':'INACTIVO'
          })
        });
        console.log(this.productos);
      },error: (respuestaError:HttpErrorResponse)=>{

        const respuesta : Respuesta = { ...respuestaError.error }
        const codigoHttp : number = respuestaError.status; 
        if(codigoHttp !== 0){
          errorAlerta( respuesta.code.toString(), respuesta.message);
        }else{
          errorAlerta( 'Error en el servidor', AuthService.mensajeErrorDelServidor);
        }
      }
    } );

  }

  //variable para almacenar todas las subscripciones de lista
  private listarSubs: Subscription = new Subscription;

  private _listAll() : void {
    //vaciamos los arreglos  
    this.productos = [] as Producto[];
    this.proveedores = [] as Proveedor[];
    this.tallas = [] as Talla[];
    this.categorias = [] as Categoria[];
    this.modelos = [] as Modelo[];
    this.colores = [] as Color[];
    this.marcas = [] as Marca[];
    
    //hacemos la mega subscripción

    this.listarSubs = forkJoin(
      [
        this.productoService.listarProductos(),
        this.proveedorService.listarProveedores(),
        this.tallaService.listarTallas(),
        this.categoriaService.listarCategorias(),
        this.modeloService.listarModelos(),
        this.colorService.listarColores(),
        this.marcaService.listarMarcas()
      ])
      .subscribe({
        next:(respuestas: Respuesta[])=>{
          const productosData = [...respuestas[0].data];
          const proveedoresData = [...respuestas[1].data];
          const tallasData = [...respuestas[2].data];
          const categoriasData = [...respuestas[3].data];
          const modelosData = [...respuestas[4].data];
          const coloresData = [...respuestas[5].data];
          const marcasData = [...respuestas[6].data];

          (productosData).forEach((producto:Producto)=>{
            
            this.productos.push({
              ...producto,
              productoEstado:producto.prod_estado?'ACTIVO':'INACTIVO',
              proveedorDescripcion: (proveedoresData.find((proveedor:Proveedor) => proveedor.pro_id === producto.proveedor)).pro_nombre || '',
              tallaDescripcion: (tallasData.find((talla:Talla) =>talla.tal_id === producto.talla)).tal_descripcion || '',
              categoriaDescripcion: (categoriasData.find((categoria:Categoria) => categoria.cat_id === producto.categoria)).cat_descripcion || '',
              modeloDescripcion: (modelosData.find((modelo:Modelo) => modelo.mod_id === producto.modelo)).mod_descripcion || '',
              colorDescripcion: (coloresData.find((color:Color) => color.col_id === producto.color)).col_descripcion || '',
              marcaDescripcion: (marcasData.find((marca:Marca) => marca.mar_id === producto.marca)).mar_descripcion || ''
            });
          
          });

          (proveedoresData).forEach((proveedor:Proveedor)=>{
            this.proveedores.push({
              ...proveedor, 
              proveedorEstado:proveedor.pro_estado?'ACTIVO':'INACTIVO'
            })
          });

          (tallasData).forEach((talla:Talla)=>{
            this.tallas.push({
              ...talla, 
              tallaEstado:talla.tal_estado?'ACTIVO':'INACTIVO'
            })
          });

          (categoriasData).forEach((categoria:Categoria)=>{
            this.categorias.push({
              ...categoria, 
              categoriaEstado:categoria.cat_estado?'ACTIVO':'INACTIVO'
            })
          });

          (modelosData).forEach((modelo:Modelo)=>{
            this.modelos.push({
              ...modelo, 
              modeloEstado:modelo.mod_estado?'ACTIVO':'INACTIVO'
            })
          });

          (coloresData).forEach((color:Color)=>{
            this.colores.push({
              ...color, 
              colorEstado:color.col_estado?'ACTIVO':'INACTIVO'
            })
          });

          (marcasData).forEach((marca:Marca)=>{
            this.marcas.push({
              ...marca, 
              marcaEstado:marca.mar_estado?'ACTIVO':'INACTIVO'
            })
          });
          console.log(this.productos);
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
      });

  }
  
  private _registrarProducto(producto: Producto) : void {

    this.productoService.registrarProductos(producto).subscribe({
      
      next:(respuesta: Respuesta)=>{

        this.messageService.add({
          severity:'success', 
          summary: 'Registrando...', 
          detail: respuesta.message
        });
        
        this._listAll();

      }, error : (respuestaError : HttpErrorResponse) =>{
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

  private _actualizarProducto(producto : Producto):void{
    
    this.productoService.actualizarProductos(producto).subscribe(
      {
        next: (respuesta: Respuesta)=>{

          this.messageService.add({
            severity:'success', 
            summary: 'Actualizando...', 
            detail: respuesta.message
          });
          
          this._listAll();
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

  public closeAlert(): void{
    this.messageService.clear();
  }

  public eliminarProducto(idProducto : number) : void {
    this.productoService.eliminarProducto(idProducto).subscribe({
      next: (respuesta:Respuesta)=>{

        this.messageService.add({
          severity:'success', 
          summary: 'Excelente', 
          detail: respuesta.message
        });
        
        this._listarProductos();
        
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

  public guardarProducto({esRegistro,producto}: DataProductoRegistroActualizar) : void {
    if(!this.esVisualizar){
      if(esRegistro){
        this._registrarProducto(producto);
      }else{
        this._actualizarProducto(producto);
      }
    }else{

      this.messageService.add({
        severity:'error',
        summary:'Peligro',
        detail:'No se puede realizar esta actividad.'
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
    console.log(this.esVisualizar);
    
  }
  
  public guardarProductoParaActualizar( producto: Producto): void{ 
    this.productoParaActualizar = {...producto};
  }

  public visualizarProducto( esVisualizar: boolean) : void{
    this.esVisualizar = esVisualizar ;
    console.log(this.esVisualizar);
  }

}
