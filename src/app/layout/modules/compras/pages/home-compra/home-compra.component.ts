import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { errorAlerta, exitoAlerta } from 'src/app/shared/utils/reutilizables';
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
import { Compra } from '../../models/compra.model';
import { CompraService } from '../../services/compra.service';
import { ComprobanteDePagoDTO } from '../../utils/comprobante-pago-dto';
import { ConfigGuiaRemision } from '../../utils/configuracion-guia-remision';
import { DetallesDeCompraDTO } from '../../utils/detalles-compra-dto';
import {GuiaRemisionDTO} from "../../utils/guia-remision-dto";
import {DatePipe} from '@angular/common';

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

  public productosPorProveedor : Producto[] = [];
  public productos : Producto[] = [];
  public categorias : Categoria[] = [];
  public modelos : Modelo[] = [];
  public marcas : Marca[] = [];
  public colores : Color[] = [];
  public tallas : Talla[] = [];

  //Data guardada formularios
  public proveedorSeleccionado!: Proveedor;
  public isProviderSave: boolean = false;

  public comprobanteDePago!: ComprobanteDePagoDTO;
  public isPurchaseSave: boolean = false;

  public guiaDeRemision!: GuiaRemisionDTO;
  public isRemissionGuideSave: boolean = false;

  public detallesParaCompra!: DetallesDeCompraDTO;
  public isDetailsSave: boolean = false;

  //
  public todayDate =  new Date();
  

  constructor(
    private _productoService : ProductoService,
    private _tallaService : TallaService,
    private _modeloService : ModeloService,
    private _proveedorService : ProveedorService,
    private _colorService : ColorService,
    private _marcaService : MarcaService,
    private _categoriaService : CategoriaService,
    public rolPermissionService: RolPermissionService,
    public messageService: MessageService,
    public authService: AuthService,
    private _compraService: CompraService,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._listAll();
  }

  public closeAlert(): void{
    this.messageService.clear();
  }

  private _suscripcionProveedores: Subscription = new Subscription;
  
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
    this._proveedorService.registrarProveedor(proveedor).subscribe(
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

    this._productoService.registrarProductos(producto).subscribe({

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
    this.configGuiaRemision.hayGuiaRemision?this.configGuiaRemision.hayGuiaRemision=false:this.configGuiaRemision.hayGuiaRemision=true;
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
        this._productoService.listarProductos(),
        this._proveedorService.listarProveedores(),
        this._tallaService.listarTallas(),
        this._categoriaService.listarCategorias(),
        this._modeloService.listarModelos(),
        this._colorService.listarColores(),
        this._marcaService.listarMarcas()
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
    return this.proveedorSeleccionado && this.isProviderSave;
  }

  public esPosibleGuardarComprobantes(): boolean {
    return this.comprobanteDePago && this.isPurchaseSave ;
  }

  public esPosibleGuardarGuiaRemision(): boolean {
    return this.guiaDeRemision && this.isRemissionGuideSave;
  }

  public esPosibleGuardarDetalles(): boolean{
    return this.detallesParaCompra && this.isDetailsSave;
  }
  // valores : any;
  public buscarProductosPorProveedor(): void {
    this.productosPorProveedor = [] ;
    this.mostrarTablaProducto=!this.mostrarTablaProducto;
    

    this._productoService.listarProductosPorProveedor(this.proveedorSeleccionado.pro_id).subscribe(
      {
        next: (respuesta:Respuesta)=>{
          (respuesta.data).forEach((producto:Producto)=>{
            this.productosPorProveedor.push({
              ...producto,
              productoEstado: producto.prod_estado?'ACTIVO':'INACTIVO'
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
      }
    );
  }

  public esPosibleComprar(): boolean {
    return this.configGuiaRemision.hayGuiaRemision?
    this.esPosibleBuscarProductos() && this.esPosibleGuardarComprobantes() && this.esPosibleGuardarDetalles() && this.esPosibleGuardarGuiaRemision():
    this.esPosibleBuscarProductos() && this.esPosibleGuardarComprobantes() && this.esPosibleGuardarDetalles() ;
    
  }

  ngOnDestroy(): void {
    this._suscripcionProveedores.unsubscribe();
    this.listarData.unsubscribe();
  }

  public idProveedorSeleccionado : number = 0;
  public registrarNuevoProductoEnModal($event: boolean): void {
    this.mostrarModalProducto = $event;
    // this.proveedorSeleccionado = this.proveedorSeleccionado;
  }
  
  public guardarProveedorSeleccionado($event: Proveedor): void {
    this.proveedorSeleccionado = $event;
    this.idProveedorSeleccionado = this.proveedorSeleccionado.pro_id;
  }

  public detallesDeCompra: DetalleDeCompra[] = [];
  public nuevoDetalle: DetalleDeCompra = {} as DetalleDeCompra;
  public agregarDetalleCompra(productoSeleccionado: Producto): void {
      const detalle : DetalleDeCompra = {
        det_comp_cantidad: 0,
        det_comp_importe: 0,
        producto: productoSeleccionado.prod_id,
        productoDetalle: productoSeleccionado,
        producto_descripcion: productoSeleccionado.prod_descripcion,
        compra: 0
      }
      this.nuevoDetalle = {...detalle};
  }

  public registarCompra(): void{ 

    const nuevaCompra : Compra = {
      comp_importe_total : this.detallesParaCompra.comp_importe_total , 
      comp_fecha_emision : this._datePipe.transform( this.comprobanteDePago.fechaDeEmision, "yyyy-MM-dd")! ,
      comp_fecha_registro : this._datePipe.transform( this.todayDate.toLocaleString("en-US", {timeZone: "America/Lima"}), "yyyy-MM-dd")!,
      comp_serie : this.comprobanteDePago.serieDePago ,
      comp_numero : this.comprobanteDePago.numeroDePago , 
      comp_ingresada : true, 
      usuario : this.authService.getUserInfo().id ,
      proveedor : this.proveedorSeleccionado.pro_id , 
      tipo_comprobante: this.comprobanteDePago.tipoDeComprobante
    }
    console.log(nuevaCompra);
    const detallesDeCompra : DetalleDeCompra[] = [...this.detallesParaCompra.detallesDeCompra];
    console.log(this.guiaDeRemision);
    const guiaDeRemisionDeCompra: GuiaRemisionDTO = {
      fechaDeEmision: this._datePipe.transform( this.guiaDeRemision.fechaDeEmision , "yyyy-MM-dd")! ,
      serieDePago: this.guiaDeRemision.serieDePago,
      numeroDePago: this.guiaDeRemision.numeroDePago
    };
    this._compraService.registrarUsuario( nuevaCompra, detallesDeCompra, guiaDeRemisionDeCompra ).subscribe(
      {
        next: (respuesta: Respuesta)=>{
          this.messageService.add({
            severity:'success', 
            summary: 'Registrado...', 
            detail: respuesta.message
          });
          exitoAlerta('¡Registrado!', respuesta.message);
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
            errorAlerta( `${respuesta.code}` , respuesta.message );
          }else{
            errorAlerta( 'Error en el servidor' , AuthService.mensajeErrorDelServidor );
          }
        }
      }
    );
  }

  
}
