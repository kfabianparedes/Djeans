import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';

//importar necesarios para reportes de compras
import { Compra } from '../../../compras/models/compra.model';
import { ReporteCompraService } from './services/reporte-compra.service';

//importar necesarios para proveedores
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ProveedorService } from '../../../proveedores/services/proveedor.service';

//importar necesarios para usuarios
import { Usuario } from '../../../usuarios/models/usuario.model';
import { UsuarioService } from '../../../usuarios/services/usuario.service';

//importar necesarios para detalle de compra 
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { DetalleDeCompraService } from 'src/app/shared/services/detalle-de-compra.service';

//importar necesarios para producto
import { Producto } from '../../../productos/models/producto.model';
import { ProductoService } from '../../../productos/services/producto.service';

//importar necesarios para tipo de comprobante
import { TipoDeComprobante } from 'src/app/shared/models/tipo-de-comprobante.model';
import { TipoDeComprobanteService } from 'src/app/shared/services/tipo-de-comprobante.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-compra',
  templateUrl: './reporte-compra.component.html',
  styleUrls: ['./reporte-compra.component.css']
})
export class ReporteCompraComponent implements OnInit {

  public compras : Compra[] = [] ; 
  public usuarios : Usuario [] = [] ; 
  public productos : Producto [] = [];
  public proveedores : Proveedor [] = [] ; 
  public comprobantes : TipoDeComprobante[] = [];
  public mostrarModal : boolean = false; 
  public detalleDeLaCompraVisualizar : DetalleDeCompra[] = [];

  //variables de la compra que se quiere visualizar
  public visualizarDetalleCompraId : number = 0; 
  public visualizarDetalleCompraSerie: string = "" ; 
  public visualizarDetalleCompraNumero: string = "";

  //variables que recepcionan el filtro de la fecha
  public rangoFechas : string [] = [] ; 

  //fecha actual
  date: Date = new Date();

  constructor(
    private reporteCompraService : ReporteCompraService,
    private usuarioService : UsuarioService,
    private productoService : ProductoService,
    private detalleDeCompraService: DetalleDeCompraService,
    private proveedorService : ProveedorService,
    private comprobanteService: TipoDeComprobanteService,
    public messageService : MessageService) { }

  ngOnInit(): void {
    this._listarCompras();
  }

  private listarCompras: Subscription = new Subscription

  private _listarCompras(): void {
    this.compras = [];
    this.usuarios= [];
    this.proveedores = [];
    this.comprobantes = [];
    
    this.listarCompras = forkJoin(
      [
        this.reporteCompraService.listarCompras(),
        this.usuarioService.listarUsuarios(),
        this.proveedorService.listarProveedores(),
        this.comprobanteService.listarTipoDeComprobantes()
      ]
    ).subscribe(
      {
        next:(respuestas: Respuesta[])=>{
          const comprasData = [...respuestas[0].data];
          const usuariosData = [...respuestas[1].data];
          const proveedoresData = [...respuestas[2].data];
          const comprobantesData = [...respuestas[3].data];
          
          (comprasData).forEach((compra:Compra)=>{
            
            this.compras.push({
              ...compra,
              proveedor_descripcion:(proveedoresData.find((proveedor:Proveedor) => proveedor.pro_id === compra.proveedor)).pro_nombre || '',
              tipo_comprobante_descripcion:(comprobantesData.find((tipoComprobante:TipoDeComprobante) => tipoComprobante.tipo_comprobante_id === compra.tipo_comprobante)).tipo_comprobante_descripcion || '',
            })
          })
          console.log(this.compras);
          
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

  private _listarComprasConFiltro(): void {
    this.compras = [];
    this.usuarios= [];
    this.proveedores = [];
    this.comprobantes = [];
    
    this.listarCompras = forkJoin(
      [
        this.reporteCompraService.listarComprasConFiltroDeFecha(this.rangoFechas[0],this.rangoFechas[1]),
        this.usuarioService.listarUsuarios(),
        this.proveedorService.listarProveedores(),
        this.comprobanteService.listarTipoDeComprobantes()
      ]
    ).subscribe(
      {
        next:(respuestas: Respuesta[])=>{
          const comprasData = [...respuestas[0].data];
          const usuariosData = [...respuestas[1].data];
          const proveedoresData = [...respuestas[2].data];
          const comprobantesData = [...respuestas[3].data];
          
          (comprasData).forEach((compra:Compra)=>{
            
            this.compras.push({
              ...compra,
              proveedor_descripcion:(proveedoresData.find((proveedor:Proveedor) => proveedor.pro_id === compra.proveedor)).pro_nombre || '',
              tipo_comprobante_descripcion:(comprobantesData.find((tipoComprobante:TipoDeComprobante) => tipoComprobante.tipo_comprobante_id === compra.tipo_comprobante)).tipo_comprobante_descripcion || '',
            })
          })
          console.log(this.compras);
          
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
  public closeAlert(): void{
    this.messageService.clear();
  }

  private listarDetalles: Subscription = new Subscription();
  private _listarDetallesDeCompra(idCompra: number) : void {
    
    this.detalleDeLaCompraVisualizar = [];
    this.productos = [];

    this.listarCompras = forkJoin(
      [
        this.detalleDeCompraService.listarDetallesDeCompraPorIdCompra(idCompra),
        this.productoService.listarProductos()
      ]
    ).subscribe(
      {
        next:(respuestas: Respuesta[])=>{
          const detallesData = [...respuestas[0].data];
          const productosData = [...respuestas[1].data];
          
          (detallesData).forEach((detalle:DetalleDeCompra)=>{
            
            this.detalleDeLaCompraVisualizar.push({
              ...detalle,
              producto_descripcion:(productosData.find((producto:Producto) => producto.prod_id === detalle.producto)).prod_descripcion || '' 
            })
          })
          
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

  public modificarVisualizarDetalleCompraId(idCompra : number) : void {
    this.visualizarDetalleCompraId = idCompra ; 
    console.log("Compra id: " + this.visualizarDetalleCompraId);
    this._listarDetallesDeCompra(idCompra);
    
  }

  public modificarVisualizarDetalleCompraSerie(serie : string) : void {
    this.visualizarDetalleCompraSerie = serie ; 
    console.log("Compra serie: " + this.visualizarDetalleCompraSerie);
    
  }

  public modificarVisualizarDetalleCompraNumero(numero : string) : void {
    this.visualizarDetalleCompraNumero = numero ; 
    console.log("Compra número: "+ this.visualizarDetalleCompraNumero);
    
  }
  
  public modificarMostrarModal(mostrarModal : boolean) : void {
    this.mostrarModal = mostrarModal;
  }
  public modificarRangoFechas(rangoFechas : string[] ) : void{
    
    this.rangoFechas = rangoFechas; 

    console.log("Fecha Inicio: " + this.rangoFechas[0]);
    console.log("Fecha Fin: " + this.rangoFechas[1]);
    if(this.rangoFechas[0]=="refrezcar" && this.rangoFechas[1]=="refrezcar"){
      this._listarCompras();

    }else{
      if( !this.rangoFechas[0] || !this.rangoFechas[1]){
        this.messageService.add({
          severity:'error',
          summary:'Campos incompletos',
          detail:'Debe llenar los dos campos de fechas para hacer el filtrado.'
        });
      }else{
        //comparamos si la fecha inicial es menor a la fecha final
        if(this.rangoFechas[0] <= this.rangoFechas[1]){
          let date = new Date(this.rangoFechas[0])
          //comprobamos que la fecha inicial sea menor a la fecha actual
          if(date > this.date){
            this.messageService.add({
              severity:'error',
              summary:'Error de filtro',
              detail:'La fecha inicial no puede ser mayor a la fecha actual.'
            });
          }else{
            let date = new Date(this.rangoFechas[1])
            //comprobamos que la fecha final sea menor a la fecha actual
            if(date > this.date){
              this.messageService.add({
                severity:'error',
                summary:'Error de filtro',
                detail:'La fecha final no puede ser mayor a la fecha actual.'
              });
            }else{
              this._listarComprasConFiltro();
            }
          }
        }else{
          this.messageService.add({
            severity:'error',
            summary:'Error de filtro',
            detail:'La fecha inicial no puede ser mayor a la final.'
          });
        }
      } 
    }
  }

  
}
