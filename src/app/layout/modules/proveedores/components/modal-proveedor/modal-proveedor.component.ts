import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { Proveedor } from '../../models/proveedor.model';
import { DataProveedorRegistroActualizar } from '../../models/registro-actualizar-proveedor.model';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { MessageService } from 'primeng/api';
import { RolPermissionService } from 'src/app/shared/services/rol-permission.service';
import { PROVIDER_MODAL_RESPONSIVE } from '../../utils/breakpoint-models-modal';

@Component({
  selector: 'modal-proveedor',
  templateUrl: './modal-proveedor.component.html',
  styleUrls: ['./modal-proveedor.component.css']
})
export class ModalProveedorComponent implements OnInit {

  //validaciones para los formularios
  private validarRuc : RegExp = /^[0-9]+$/;
  private validarNombre : RegExp = /^[^\s][a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
  private validarRazonSocial : RegExp = /^[^\s][a-zñáéíóúA-ZÑÁÉÍÓÚ. ]+$/;
  private validarDireccion : RegExp = /^[^\s][a-zñáéíóú\-.# A-ZÑÁÉÍÓÚ 0-9]+$/;
  private validarTelefono : RegExp = /^[0-9]+$/;
  private validarEmail : RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  @Input() mostrarModal : boolean = false ;
  @Input() tituloModal : string = '' ; 
  @Input() proveedorUtilizadoEnModal!: Proveedor; 
  @Input() esVisualizarModal: boolean = false ; 
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() esVisualizar = new EventEmitter<boolean>();
  @Output() enviarInformacionProveedor = new EventEmitter<DataProveedorRegistroActualizar>();

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true; 

  proveedorFormulario : FormGroup = this.fb.group({

    pro_ruc:[{value: '', disabled: this.esVisualizarModal},[Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                Validators.pattern(this.validarRuc)]],

    pro_razon_social:['',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50),
                Validators.pattern(this.validarRazonSocial)]],

    pro_nombre:['',[Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50),
                Validators.pattern(this.validarNombre)]],
                
    pro_telefono1:['',[Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9),
                Validators.pattern(this.validarTelefono)]],

    pro_telefono2:['',[Validators.minLength(9),
                Validators.maxLength(9),
                Validators.pattern(this.validarTelefono)]],

    pro_direccion1:['',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50),
                Validators.pattern(this.validarDireccion)]],

    pro_direccion2:['',[Validators.minLength(5),
                Validators.maxLength(50),
                Validators.pattern(this.validarDireccion)]],

    pro_email:['',[Validators.required,
                Validators.minLength(11),
                Validators.maxLength(50),
                Validators.pattern(this.validarEmail)]],
    
    pro_estado:[true,Validators.required]
  });

  //vaciar formulario
  private _datosIniciales ={
    pro_ruc :'',
    pro_nombre :'',
    pro_razon_social :'',
    pro_telefono1 :'',
    pro_telefono2 :'',
    pro_direccion1 :'',
    pro_direccion2 :'',
    pro_email :'',
    pro_estado : true,

  }

  public readonly PROVIDER_MODAL_RESPONSIVE = PROVIDER_MODAL_RESPONSIVE;
  constructor(
    public rolPermissionService: RolPermissionService,
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this._reiniciarFormulario();
    console.log(this.esVisualizarModal);
    
  }

  public guardarProveedor() : void {
        if (this.proveedorFormulario.valid){
          const proveedor : Proveedor = {
            pro_id : this.proveedorUtilizadoEnModal?.pro_id,
            pro_ruc : this.ruc?.value,
            pro_nombre : this.nombre?.value,
            pro_razon_social : this.razon_social?.value,
            pro_email : this.email?.value,
            pro_telefono1 : this.telefono1?.value,
            pro_telefono2 : this.telefono2?.value,
            pro_direccion1 : this.direccion1?.value,
            pro_direccion2 : this.direccion2?.value,
            pro_estado : this.estado?.value
          }
          
          this._enviarInformacionDeProveedor(proveedor);
          
          this._culminarPeticion();
      }
    return;
  }

  private _enviarInformacionDeProveedor(proveedor:Proveedor) : void {
    const dataDePeticion : DataProveedorRegistroActualizar = {
      esRegistro : this.esRegistro,
      proveedor : {...proveedor}
    }
    this.enviarInformacionProveedor.emit(dataDePeticion);
  }

  //cerrarModal
  public closeModal(): void {
    this._reiniciarFormulario();
    this.esVisualizarModal = false ;
    this.mostrarModal=false;
    this.esVisualizar.emit(false);
    this.cerrarModal.emit(false);

  }

  //reiniciar Formulario
  private _reiniciarFormulario() : void {
    this.proveedorFormulario.reset({...this._datosIniciales});
  }

  private _culminarPeticion(): void {
    this.esRegistro==false?
      this.closeModal():
      this._reiniciarFormulario();
  }

  //obtener variables formularios
  get ruc(){
    return this.proveedorFormulario.get('pro_ruc');
  }
  get nombre(){
    return this.proveedorFormulario.get('pro_nombre');
  }
  get razon_social(){
    return this.proveedorFormulario.get('pro_razon_social');
  }
  get telefono1(){
    return this.proveedorFormulario.get('pro_telefono1');
  }
  get telefono2(){
    return this.proveedorFormulario.get('pro_telefono2');
  }
  get direccion1(){
    return this.proveedorFormulario.get('pro_direccion1');
  }
  get direccion2(){
    return this.proveedorFormulario.get('pro_direccion2');
  }
  get email(){
    return this.proveedorFormulario.get('pro_email');
  }
  get estado(){
    return this.proveedorFormulario.get('pro_estado');
  }

  public tel1: string = '';
  public tel2: string = '';



  ngOnChanges(changes: SimpleChanges) : void{
      
      if(changes['esVisualizarModal']){
        const visualizar : boolean = changes['esVisualizarModal'].currentValue; 
        
        console.log(changes['esVisualizarModal']);
        visualizar? this.proveedorFormulario.disable():this.proveedorFormulario.enable()
      }
      if(changes['proveedorUtilizadoEnModal']){
        this.esRegistro = false ; 
        const proveedor : Proveedor = changes['proveedorUtilizadoEnModal'].currentValue;

        
        if (proveedor?.pro_telefono1 !== undefined){
          this.tel1 = proveedor?.pro_telefono1.slice(3,12);
        }

        if (proveedor?.pro_telefono2 !== undefined && proveedor?.pro_telefono2 !== ''){
          this.tel2 = proveedor?.pro_telefono2.slice(3,12);
        }
        

        this.proveedorFormulario.reset({
          pro_ruc : proveedor?.pro_ruc,
          pro_nombre : proveedor?.pro_nombre,
          pro_razon_social : proveedor?.pro_razon_social,
          pro_email : proveedor?.pro_email,
          pro_telefono1 : this.tel1,
          pro_telefono2 :this.tel2,
          pro_direccion1 : proveedor?.pro_direccion1,
          pro_direccion2 : proveedor?.pro_direccion2,
          pro_estado : proveedor?.pro_estado
        });

        this.tel1 = '';
        this.tel2 = '';
      }else{
        this.esRegistro = true ; 
      }
    
  }  

}
