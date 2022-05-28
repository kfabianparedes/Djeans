import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { TipoDeComprobante } from 'src/app/shared/models/tipo-de-comprobante.model';
import { TipoDeComprobanteService } from 'src/app/shared/services/tipo-de-comprobante.service';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ConfigGuiaRemision } from '../../utils/configuracion-guia-remision';

@Component({
  selector: 'compra-comprobante-pago',
  templateUrl: './comprobante-pago.component.html',
  styleUrls: ['./comprobante-pago.component.css']
})
export class ComprobantePagoComponent implements OnInit {
  proveedor : Proveedor = {} as Proveedor;
  tiposDeComprobante: TipoDeComprobante[] = [];
  comprobante: TipoDeComprobante = {} as TipoDeComprobante;

  public todayDate =  new Date();
  public tomorrowDate =  new Date(this.todayDate.setDate(this.todayDate.getDate()));
  
  public configGuiaRemision: ConfigGuiaRemision = {
    hayGuiaRemision: false,
    iconGuiaRemision: 'plus',
    colorGuiaRemision: 'primary',
    textoOpcion: 'AGREGAR'
  };

  constructor(private _tipoDeComprobanteService: TipoDeComprobanteService) { }

  ngOnInit(): void {
    this._listarModelos();
  }

  private _listarModelos(): void{
    this.tiposDeComprobante = [];
    this._tipoDeComprobanteService.listarTipoDeComprobantes().subscribe({
      next: (respuesta: Respuesta)=>{
        
        (respuesta.data).forEach((tipoDeComprobante: TipoDeComprobante) => {
          this.tiposDeComprobante.push({...tipoDeComprobante});
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

  public agregarGuiaRemision(): void{

    this.configGuiaRemision.hayGuiaRemision = !this.configGuiaRemision.hayGuiaRemision;
    this.configGuiaRemision.iconGuiaRemision==='plus'?this.configGuiaRemision.iconGuiaRemision='times':this.configGuiaRemision.iconGuiaRemision='plus';
    this.configGuiaRemision.colorGuiaRemision==='primary'?this.configGuiaRemision.colorGuiaRemision='danger':this.configGuiaRemision.colorGuiaRemision='primary';
    this.configGuiaRemision.textoOpcion=='AGREGAR'?this.configGuiaRemision.textoOpcion='CANCELAR':this.configGuiaRemision.textoOpcion='AGREGAR';
  }
}
