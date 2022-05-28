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
  
  
  @Input() proveedores: Proveedor[] = [];
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
    this.guardar?
      this.proveedorForm.disable():
      this.proveedorForm.enable()

    console.log(this.proveedorForm.value);
    // this.proveedorForm.reset({proveedor: ''});
  }

  public nuevoProveedor(): void {
    console.log('Nuevo proveedor');
    
  }
} 
