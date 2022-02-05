import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.component.html',
  styleUrls: ['./listar-sucursal.component.css']
})
export class ListarSucursalComponent implements OnInit {

  sucursal:Sucursal[]=[];

  constructor(
    private servSucursal:SucursalService,
  ) { }

  ngOnInit(): void {
    this.mostrarSucursales();
  }

  // FUNCIONES
  private mostrarSucursales():void{
    this.servSucursal.servicioListarSucursales().subscribe(
      data=>{
        this.sucursal=data.resultado;
        console.log(this.sucursal);
      },
      (fallo:HttpErrorResponse)=>{
        console.log(fallo.error);
      }
    );
  }
  
}
