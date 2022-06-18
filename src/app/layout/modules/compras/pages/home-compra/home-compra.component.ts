import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Categoria } from '../../../categorias/models/categoria.model';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Color } from '../../../colores/models/color.model';
import { ColorService } from '../../../colores/services/color.service';
import { Marca } from '../../../marcas/models/marca';
import { MarcaService } from '../../../marcas/services/marca.service';
import { Modelo } from '../../../modelos/models/modelo.model';
import { ModeloService } from '../../../modelos/services/modelo.service';
import { Producto } from '../../../productos/models/producto.model';
import { DataProductoRegistroActualizar } from '../../../productos/models/registro-actualizar-producto.model';
import { ProductoService } from '../../../productos/services/producto.service';
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { DataProveedorRegistroActualizar } from '../../../proveedores/models/registro-actualizar-proveedor.model';
import { ProveedorService } from '../../../proveedores/services/proveedor.service';
import { Talla } from '../../../tallas/models/talla.models';
import { TallaService } from '../../../tallas/services/talla.service';
import { ComprobanteDePagoDTO } from '../../utils/comprobante-pago-dto';
import { ConfigGuiaRemision } from '../../utils/configuracion-guia-remision';

@Component({
  selector: 'app-home-compra',
  templateUrl: './home-compra.component.html',
  styleUrls: ['./home-compra.component.css'],
  providers: [MessageService]
})
export class HomeCompraComponent implements OnInit , OnDestroy{

  public proveedores: Proveedor[] = [];
  public mostrarModalProveedor : boolean = false;
  public mostrarModalProducto : boolean = false;
  public mostrarTablaProducto : boolean = false;
  
  public proveedor: Proveedor = {} as Proveedor;

  public productosPorProveedor : Producto[] = [] ;
  public productos : Producto[] = [] ;
  public categorias : Categoria[] = [] ;
  public modelos : Modelo[] = [] ;
  public marcas : Marca[] = [] ;
  public colores : Color[] = [] ;
  public tallas : Talla[] = [] ;

  //Data guardada formularios
  public idProveedorSeleccionado!: number;
  public isProviderSave: boolean = false;

  public comprobanteDePago!: ComprobanteDePagoDTO;
  public isPurchaseSave: boolean = false;

  //
  constructor(
    private productoService : ProductoService, 
    private tallaService : TallaService, 
    private modeloService : ModeloService, 
    private proveedorService : ProveedorService, 
    private colorService : ColorService, 
    private marcaService : MarcaService, 
    private categoriaService : CategoriaService, 
    public rolPermissionService: RolPermissionService,
    public messageService: MessageService,
  ) { }


  ngOnInit(): void {
    // this._listarProveedores();
    this._listAll();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _suscripcionProveedores: Subscription = new Subscription;
  private _listarProveedores() : void {
    this.proveedores = [];
    this._suscripcionProveedores = this.proveedorService.listarProveedores().subscribe({
      next: (respuesta:Respuesta)=>{

        (respuesta.data).forEach((proveedor:Proveedor)=>{

          this.proveedores.push({
            ...proveedor,
            proveedorEstado: proveedor.pro_estado?'ACTIVO':'INACTIVO'
          })
        });
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

  public guardarProveedor({proveedor}: DataProveedorRegistroActualizar ): void {
    this._registrarProveedor(proveedor);
  }

  public guardarProducto({producto}: DataProductoRegistroActualizar) : void {
    this._registrarProducto(producto);
  }
  
  public modificarEstadoTablaProducto(estadoModalP: boolean): void {
    this.mostrarTablaProducto = estadoModalP;
  }

  public modificarEstadoModalProducto(estadoModalP: boolean): void {
    this.mostrarModalProducto = estadoModalP;
  }

  private _registrarProveedor(proveedor : Proveedor):void{
    this.proveedorService.registrarProveedor(proveedor).subscribe(
      {
        next: (respuesta: Respuesta)=>{
          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          this._listAll();
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

  public configGuiaRemision: ConfigGuiaRemision = {
    hayGuiaRemision: false,
    iconGuiaRemision: 'save',
    colorGuiaRemision: 'success',
    textoOpcion: 'AGREGAR'
  };

  public agregarGuiaRemisionCompra(): void {
    this.configGuiaRemision.hayGuiaRemision = !this.configGuiaRemision.hayGuiaRemision;
    this.configGuiaRemision.iconGuiaRemision==='save'?this.configGuiaRemision.iconGuiaRemision='times':this.configGuiaRemision.iconGuiaRemision='save';
    this.configGuiaRemision.colorGuiaRemision==='success'?this.configGuiaRemision.colorGuiaRemision='danger':this.configGuiaRemision.colorGuiaRemision='success';
    this.configGuiaRemision.textoOpcion=='AGREGAR'?this.configGuiaRemision.textoOpcion='CANCELAR':this.configGuiaRemision.textoOpcion='AGREGAR';
  }
  private listarData: Subscription = new Subscription;
  
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

    this.listarData = forkJoin(
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
  
  public esPosibleBuscarProductos(): boolean {
    return this.idProveedorSeleccionado && this.isProviderSave ? true : false;
  }
  
  public esPosibleGuardarComprobantes(): boolean {
    return this.comprobanteDePago && this.isPurchaseSave ? true : false;
  }

  public buscarProductosPorProveedor(): void {
    this.productosPorProveedor = [] ;
    this.mostrarTablaProducto=!this.mostrarTablaProducto;
    this.productoService.listarProductosPorProveedor(this.idProveedorSeleccionado).subscribe(
      {
        next: (respuesta:Respuesta)=>{
          (respuesta.data).forEach((producto:Producto)=>{
            this.productosPorProveedor.push({
              ...producto,
              productoEstado: producto.prod_estado?'ACTIVO':'INACTIVO'
            })
          });
          console.log('LISTA DE PRODUCTOS');
          console.log(this.productosPorProveedor);
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

  public esPosibleGenerarCompra(): boolean {
    return this.esPosibleBuscarProductos() && this.esPosibleGuardarComprobantes();
  }

  ngOnDestroy(): void {
    this._suscripcionProveedores.unsubscribe();
    this.listarData.unsubscribe();
  }
}
