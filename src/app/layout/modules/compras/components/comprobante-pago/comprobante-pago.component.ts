import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { TipoDeComprobante } from 'src/app/shared/models/tipo-de-comprobante.model';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { TipoDeComprobanteService } from 'src/app/shared/services/tipo-de-comprobante.service';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ComprobanteDePagoDTO } from '../../utils/comprobante-pago-dto';
import { ConfigGuiaRemision } from '../../utils/configuracion-guia-remision';

@Component({
  selector: 'compra-comprobante-pago',
  templateUrl: './comprobante-pago.component.html',
  styleUrls: ['./comprobante-pago.component.css']
})
export class ComprobantePagoComponent implements OnInit {
  @Output() isDataSave = new EventEmitter<boolean>();
  @Input() dataSave! : boolean;

  @Output() dataComprobanteDePago = new EventEmitter<ComprobanteDePagoDTO>();
  proveedor : Proveedor = {} as Proveedor;
  tiposDeComprobante: TipoDeComprobante[] = [];

  public todayDate =  new Date();
  public tomorrowDate =  new Date(this.todayDate.setDate(this.todayDate.getDate()));

  public configGuiaRemision: ConfigGuiaRemision = {
    hayGuiaRemision: false,
    iconGuiaRemision: 'plus',
    colorGuiaRemision: 'primary',
    textoOpcion: 'AGREGAR'
  };

  public comprobanteDePagoForm: FormGroup = this.fb.group({
    tipoDeComprobante: ['', [ Validators.required ]],
    fechaDeEmision: ['', [ Validators.required ]],
    serieDePago: ['', [ Validators.required, Validators.minLength(4) , Validators.maxLength(4) ,  Validators.pattern(/^[A-Z0-9]+[0-9]*$/)]],
    numeroDePago: ['', [ Validators.required, Validators.minLength(6) , Validators.maxLength(6),  Validators.pattern(/^[0-9]*$/)]],
  });
  
  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  constructor(
      private fb: FormBuilder,
      private _buttonProgressService: ButtonProgressService,
      private _tipoDeComprobanteService: TipoDeComprobanteService) { }
      
  ngOnInit(): void {
    this._listarModelos();
  }

  public guardarDatos(): void {

    if(this.dataSave){
      this.comprobanteDePagoForm.disable();
      const informacionComprobanteDePago : ComprobanteDePagoDTO = {
        tipoDeComprobante: this.tipoDeComprobante?.value,
        fechaDeEmision: this.fechaDeEmision?.value,
        serieDePago: this.serieDePago?.value,
        numeroDePago: this.numeroDePago?.value,
      }
      this.dataComprobanteDePago.emit(informacionComprobanteDePago);
      this.isDataSave.emit(true)
    }else{
      this.comprobanteDePagoForm.enable()
      this.isDataSave.emit(false);
    }
    // console.log(this.comprobanteDePagoForm.value);
    // this.proveedorForm.reset({proveedor: ''});
  }

  get tipoDeComprobante() {
    return this.comprobanteDePagoForm.get('tipoDeComprobante');
  }
  get fechaDeEmision() {
    return this.comprobanteDePagoForm.get('fechaDeEmision');
  }
  get serieDePago() {
    return this.comprobanteDePagoForm.get('serieDePago');
  }
  get numeroDePago() {
    return this.comprobanteDePagoForm.get('numeroDePago');
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

}
