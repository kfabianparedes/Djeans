import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Tienda } from '../../../tiendas/models/tienda.models';
import { TiendaService } from '../../../tiendas/services/tienda.service';
import { Inventario } from '../../models/inventario.models';
import { InventarioService } from '../../services/inventario.service';
import { ProductoService } from '../../../productos/services/producto.service';
import { Producto } from '../../../productos/models/producto.model';

@Component({
  selector: 'app-home-inventario',
  templateUrl: './home-inventario.component.html',
  styleUrls: ['./home-inventario.component.css']
})
export class HomeInventarioComponent implements OnInit {

  public inventarios : Inventario [] = [] ; 
  public productos: Producto [] = [] ;
  public nombreTienda : string = ""; 
  public producto: Producto = {} as Producto ; 

  constructor(
    private inventarioService : InventarioService,
    public messageService: MessageService,
    private productoService : ProductoService,
    private tiendaService : TiendaService
    ) { }

  ngOnInit(): void {
    this._listarInventarios();
  }

  private subsList : Subscription = new Subscription;

  private _listarInventarios() : void {
    const id_tienda_constante = 1 ; 

    this.subsList = forkJoin(
      [
        this.inventarioService.listarInventarioDeTienda(id_tienda_constante),
        this.productoService.listarProductos(),
        this.tiendaService.obtenerTiendaPorId(id_tienda_constante)
      ]
    ).subscribe({
      next:(respuestas: Respuesta[])=>{
        const inventariosData = [...respuestas[0].data];
        const productosData = [...respuestas[1].data];
        const nombreTienda = [...respuestas[2].data];

        this.nombreTienda = nombreTienda[0].tie_nombre; 
        
        (inventariosData).forEach((inventario:Inventario)=>{
          this.producto = {...(productosData.find((producto:Producto) => producto.prod_id === inventario.producto))}
          this.inventarios.push({
            ...inventario,
            producto_descripcion : this.producto.prod_descripcion,
            producto_precio_venta : this.producto.prod_precio_venta,
            producto_precio_compra : this.producto.prod_precio_compra,
            producto_promocion : this.producto.prod_descuento_promocion
          })
        })
        console.log(this.inventarios);
        
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
  public closeAlert(): void{
    this.messageService.clear();
  }
}

