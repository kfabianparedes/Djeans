import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Proveedor } from '../../../proveedores/models/proveedor.model';

@Component({
  selector: 'compra-informacion-proveedor',
  templateUrl: './informacion-proveedor.component.html',
  styleUrls: ['./informacion-proveedor.component.css']
})
export class InformacionProveedorComponent {
  @Output() isDataSave = new EventEmitter<boolean>();
  @Input() dataSave! : boolean;

  @Output() registrarNuevoProveedor = new EventEmitter<boolean>();
  @Input() proveedores: Proveedor[] = [];
  @Output() proveedorSeleccionado = new EventEmitter<Proveedor>();

  public proveedorForm: FormGroup = this.fb.group({
    proveedor: ['', [ Validators.required ]],
  });

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  constructor(
    private fb: FormBuilder,
    private _buttonProgressService: ButtonProgressService
    ) { }

  get proveedor() {
    return this.proveedorForm.get('proveedor');
  }

  public guardarDatos(): void {
    if(this.dataSave){
      this.proveedorForm.disable();
      this.proveedorSeleccionado.emit(this.proveedor?.value);
      this.isDataSave.emit(true)
    }else{
      this.proveedorForm.enable()
      this.isDataSave.emit(false);
    }
  }

  public nuevoProveedor(): void {
    this.registrarNuevoProveedor.emit(true);
  }






  

} 
