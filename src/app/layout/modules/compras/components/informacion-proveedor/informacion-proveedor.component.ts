import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from '../../../proveedores/models/proveedor.model';

@Component({
  selector: 'compra-informacion-proveedor',
  templateUrl: './informacion-proveedor.component.html',
  styleUrls: ['./informacion-proveedor.component.css']
})
export class InformacionProveedorComponent implements OnInit {

  @Input() proveedores: Proveedor[] = [];
  // @Output() proveedorSeleccionado = new EventEmitter<Proveedor>();
  
  proveedor! : Proveedor ;
  constructor() { }

  ngOnInit(): void {
  }

}
