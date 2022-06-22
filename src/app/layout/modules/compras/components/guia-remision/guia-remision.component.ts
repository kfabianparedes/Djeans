import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import {GuiaRemisionDTO} from "../../utils/guia-remision-dto";

@Component({
  selector: 'compra-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.css']
})
export class GuiaRemisionComponent {
  @Input() dataSave! : boolean;
  @Output() isDataSave = new EventEmitter<boolean>();

  @Output() dataGuiaDeRemision = new EventEmitter<GuiaRemisionDTO>();

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
    if(this.dataSave){
      this.guiaRemisionForm.disable();
      const informacionGuiaRemision : GuiaRemisionDTO = {
        fechaDeEmision: this.fechaDeEmision?.value,
        serieDePago: this.serieDePago?.value,
        numeroDePago: this.numeroDePago?.value,
      }
      this.dataGuiaDeRemision.emit(informacionGuiaRemision);
      this.isDataSave.emit(true)
    }else{
      this.guiaRemisionForm.enable()
      this.isDataSave.emit(false);
    }
    console.log(this.guiaRemisionForm.value);
    // this.guiaRemisionForm.reset({...this._datosIniciales});
  }
}
