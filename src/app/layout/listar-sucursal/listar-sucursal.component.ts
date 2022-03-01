import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.component.html',
  styleUrls: ['./listar-sucursal.component.css']
})
export class ListarSucursalComponent implements OnInit {

  @ViewChild('templateSucursal')templateSucursal!: ElementRef;
  sucursal:Sucursal[]=[];

  constructor(
    private servSucursal:SucursalService,
    private modal:NgbModal,
    private configModal:NgbModalConfig,
    private frmBuilder:FormBuilder
  ) {
    this.configModal.backdrop='static';
    this.configModal.keyboard=false;
  }

  ngOnInit(): void {
    this.mostrarSucursales();
    this.inicioFormulario();
  }
  // CREAR OBJETO SUCURSAL
  objSucursal:Sucursal={
    SUC_ID:0,
    SUC_NOMBRE:'',
    SUC_DIRECCION:'',
    SUC_ESTADO:true
  };

   // INICIALIZAR FORMULARIOS
  public frmSucursal:FormGroup=new FormGroup({});
  inicioFormulario():void{
    this.frmSucursal=this.frmBuilder.group({
      inputTxtNombre:[''],
      inputTxtDireccion:['']
    });
  }
  // CONTROLES
  get inputTxtNombre(){
    return this.frmSucursal.get('inputTxtNombre');
  }
  get inputTxtDireccion(){
    return this.frmSucursal.get('inputTxtDireccion');
  }

  // FUNCIONES
  limpiarControles():void{
    this.inputTxtNombre?.setValue('');
    this.inputTxtDireccion?.setValue('');
  }
  registrarSucursal():void{
    this.objSucursal.SUC_NOMBRE=this.inputTxtNombre?.value;
    this.objSucursal.SUC_DIRECCION=this.inputTxtDireccion?.value;
    this.objSucursal.SUC_ESTADO=true;
    this.servSucursal.servicioRegistrarSucursales(this.objSucursal).subscribe(
      (datoExitoso:any)=>{
        console.log(datoExitoso);
        this.limpiarControles();
        this.closeModal();
        this.mostrarSucursales();
      },
      (datoErroneo:HttpErrorResponse)=>{
        console.log(datoErroneo);
      }
    );
    console.log(this.objSucursal)
  }

  editarSucursal(){
    console.log('EDITAR SUCURSAL')
  }
  eliminarSucursal(sucursal:Sucursal){
    console.log('ELIMINAR SUCURSAL')
    // this.servSucursal.
    // this.servSucursal.servicioEliminarSucursal(sucursal);
  }

  private mostrarSucursales():void{
    this.servSucursal.servicioListarSucursales().subscribe(
      rpta=>{
        this.sucursal=rpta.data;
        // console.log(this.sucursal);
        // console.log("FIN");
      },
      (fallo:HttpErrorResponse)=>{
        console.log(fallo.error);
      }
    );
  }
  abrirModal(){
    // xs-sm-md-lg-xl-xxl
    this.modal.open(this.templateSucursal,{size:'md'});
  }
  closeModal(){
    this.modal.dismissAll();
  }


}
