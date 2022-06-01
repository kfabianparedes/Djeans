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
export class InformacionProveedorComponent implements OnInit {
  
  @Output() registrarNuevoProveedor = new EventEmitter<boolean>();
  @Input() proveedores: Proveedor[] = [];
  @Output() proveedorSeleccionado = new EventEmitter<number>();
  // @Output() proveedorRegistrado = new EventEmitter<Proveedor>();
  public guardar : boolean = false;
  // public proveedorSeleccionado : Proveedor = {} as Proveedor;
  public proveedorForm: FormGroup = this.fb.group({
    proveedor: ['', [ Validators.required ]],
  });

  public cargando : Subject<boolean> = this._buttonProgressService.cargando;
  constructor(
    private fb: FormBuilder,
    private _buttonProgressService: ButtonProgressService
    ) { }

  ngOnInit(): void {
  }

  get proveedor() {
    return this.proveedorForm.get('proveedor');
  }

  public guardarDatos(): void {
    if(this.guardar){
      this.proveedorForm.disable();
      this.proveedorSeleccionado.emit(this.proveedor?.value.pro_id);
    }else{
      this.proveedorForm.enable()
    }
    console.log(this.proveedor?.value.pro_id);
    console.log(this.proveedor?.value);
    console.log(this.proveedorForm.value);
    // this.proveedorForm.reset({proveedor: ''});
  }

  public nuevoProveedor(): void {
    this.registrarNuevoProveedor.emit(true);
  }






  

} 
