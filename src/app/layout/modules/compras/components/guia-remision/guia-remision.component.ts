import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';

@Component({
  selector: 'compra-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.css']
})
export class GuiaRemisionComponent implements OnInit,OnChanges {
  @Output() isDataSave = new EventEmitter<boolean>();
  @Input() dataSave! : boolean;
  
  @Input() mostrarModal! : boolean ;
  
  public todayDate =  new Date();
  public tomorrowDate =  new Date(this.todayDate.setDate(this.todayDate.getDate()));
  
  public guiaRemisionForm: FormGroup = this.fb.group({
    fechaDeEmision: ['', [ Validators.required ]],
    serieDePago: ['', [ Validators.required, Validators.minLength(4) , Validators.maxLength(4) ,  Validators.pattern(/^[A-Z0-9]+[0-9]*$/)]],
    numeroDePago: ['', [ Validators.required, Validators.minLength(6) , Validators.maxLength(6),  Validators.pattern(/^[0-9]*$/)]],
  });
  private  _datosIniciales = {
    fechaDeEmision: '',
    serieDePago: '',
    numeroDePago: ''
  }

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  constructor(
      private fb: FormBuilder,
      private _buttonProgressService: ButtonProgressService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.guiaRemisionForm.value);
    this.mostrarModal = changes['mostrarModal'].currentValue; 
    if(!this.mostrarModal)
      this.guiaRemisionForm.reset({...this._datosIniciales});
  }

  ngOnInit(): void {
  }



  get fechaDeEmision() {
    return this.guiaRemisionForm.get('fechaDeEmision');
  }
  get serieDePago() {
    return this.guiaRemisionForm.get('serieDePago');
  }
  get numeroDePago() {
    return this.guiaRemisionForm.get('numeroDePago');
  }

  public guardarDatos(): void {

    // if(this.dataSave){
    //   this.comprobanteDePagoForm.disable();
    //   const informacionComprobanteDePago : ComprobanteDePagoDTO = {
    //     tipoDeComprobante: this.tipoDeComprobante?.value,
    //     fechaDeEmision: this.fechaDeEmision?.value,
    //     serieDePago: this.serieDePago?.value,
    //     numeroDePago: this.numeroDePago?.value,
    //   }
    //   this.dataComprobanteDePago.emit(informacionComprobanteDePago);
    //   this.isDataSave.emit(true)
    // }else{
    //   this.comprobanteDePagoForm.enable()
    //   this.isDataSave.emit(false);
    // }
    // console.log(this.comprobanteDePagoForm.value);
    // this.proveedorForm.reset({proveedor: ''});
  }
}
