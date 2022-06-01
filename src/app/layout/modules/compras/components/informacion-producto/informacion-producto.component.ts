import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Producto } from '../../../productos/models/producto.model';
import { ProductoService } from '../../../productos/services/producto.service';

@Component({
  selector: 'informacion-producto',
  templateUrl: './informacion-producto.component.html',
  styleUrls: ['./informacion-producto.component.css']
})
export class InformacionProductoComponent implements OnInit {
  public productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this._listarProductos();
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
}
