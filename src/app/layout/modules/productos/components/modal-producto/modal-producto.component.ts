import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { IGV } from 'src/app/shared/utils/reutilizables';
import { DataProductoRegistroActualizar } from '../../models/registro-actualizar-producto.model';
//PRODUCTO
import { Producto } from '../../models/producto.model';
//MODELO
import { Modelo } from '../../../modelos/models/modelo.model';
//CATEGORIA
import { Categoria } from '../../../categorias/models/categoria.model';
//COLOR
import { Color } from '../../../colores/models/color.model';
//TALLA
import { Talla } from '../../../tallas/models/talla.models';
//PROVEEDOR
import { Proveedor } from '../../../proveedores/models/proveedor.model';
// MARCAR
import { Marca } from '../../../marcas/models/marca';

import { PRODUCT_MODAL_RESPONSIVE } from '../../utils/breakpoint-product-modal';


@Component({
  selector: 'modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {

  private validarPrecios : RegExp = /[0-9]+[.]?[0-9]*/;
  private validarCodigo : RegExp = /[a-zñáéíóú\- A-ZÑÁÉÍÓÚ0-9]+$/;
  private validarDescripcion : RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ 0-9]+$/ ;
  @Input() proveedores : Proveedor[] = [];
  @Input() tallas : Talla[] = [];
  @Input() categorias : Categoria[] = [];
  @Input() modelos : Modelo[] = [];
  @Input() marcas : Marca[] = [];
  @Input() colores : Color[] = [];
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() esVisualizar = new EventEmitter<boolean>();
  @Output() enviarInformacionProducto = new EventEmitter<DataProductoRegistroActualizar>();


  private categorriaSeleccionada : string = '';
  private marcaSeleccionada : string = ''; 
  private modeloSeleccionado : string = '' ; 
  private tallaSeleccionada : string = '' ; 
  private colorSeleccionado : string = '' ; 

  @Input() mostrarModal : boolean = false;
  @Input() tituloModal : string = '';
  @Input() productoUtilizadoEnModal!: Producto;
  @Input() esVisualizarModal: boolean = false ; 

  public cargando : Subject<boolean> = this.buttonProgressService.cargando;
  public esRegistro : boolean = true;

  productoFormulario: FormGroup = this.fb.group({

    codigo:['',[Validators.minLength(6),Validators.maxLength(6),Validators.pattern(this.validarCodigo)]],
    descripcion:['',[Validators.minLength(5),Validators.maxLength(100),Validators.pattern(this.validarDescripcion)]],
    precio_compra:['',[Validators.required,Validators.pattern(this.validarPrecios)]],
    precio_venta:['',[Validators.required,Validators.pattern(this.validarPrecios)]],
    precio_promocion:['',[Validators.pattern(this.validarPrecios)]],
    proveedor:['',[Validators.required]],
    talla:['',[Validators.required]],
    categoria:['',[Validators.required]],
    marca:['',[Validators.required]],
    modelo:['',[Validators.required]],
    color:['',[Validators.required]],
    estado:[true,[Validators.required]],
  });

  public readonly PRODUCT_MODAL_RESPONSIVE = PRODUCT_MODAL_RESPONSIVE;
  constructor(
    private fb: FormBuilder,
    public buttonProgressService: ButtonProgressService,
  ) { }

  private _datosIniciales = {
    codigo: '',
    descripcion:'',
    precio_compra:'',
    precio_venta:'',
    precio_promocion:'', 
    proveedor:'',
    talla:'',
    categoria:'',
    marca:'',
    modelo:'',
    color:'',
    estado:true
  }

  

  ngOnInit(): void {
    this._reiniciarFormulario();
    
  }

  get codigo(){
    return this.productoFormulario.get('codigo');
  }

  get descripcion(){
    return this.productoFormulario.get('descripcion');
  }

  get precio_compra(){
    return this.productoFormulario.get('precio_compra');
  }

  get precio_venta(){
    return this.productoFormulario.get('precio_venta');
  }

  get precio_promocion(){
    return this.productoFormulario.get('precio_promocion');
  }

  get proveedor(){
    return this.productoFormulario.get('proveedor');
  }

  get talla(){
    return this.productoFormulario.get('talla');
  }

  get categoria(){
    return this.productoFormulario.get('categoria');
  }

  get marca(){
    return this.productoFormulario.get('marca');
  }

  get modelo(){
    return this.productoFormulario.get('modelo');
  }
  get color(){
    return this.productoFormulario.get('color');
  }

  get estado(){
    return this.productoFormulario.get('estado');
  }



  public guardarProducto() : void {
    if(this.productoFormulario.valid){
      const producto : Producto = {
        prod_id : this.productoUtilizadoEnModal?.prod_id,
        prod_codigo: this.codigo?.value,
        prod_descripcion: this.descripcion?.value,
        prod_precio_compra: this.precio_compra?.value,
        prod_precio_venta: this.precio_venta?.value,
        prod_descuento_promocion: +((this.precio_promocion?.value==""?-1:this.precio_promocion?.value).toFixed(2)),
        prod_precio_compra_base: +(this.precio_compra?.value * IGV).toFixed(2),
        prod_precio_venta_base: +(this.precio_venta?.value * IGV).toFixed(2),
        proveedor : this.proveedor?.value,
        talla : this.talla?.value,
        marca : this.marca?.value, 
        color : this.color?.value,
        modelo : this.modelo?.value,
        categoria : this.categoria?.value,
        prod_estado : this.estado?.value
      }
      
    this._enviarInformacionDeProducto(producto);
    this._culminarPeticion();
    }
  return;
  } 

  private _reiniciarSeleccionDescripcion() : void { 
    this.categorriaSeleccionada = '' ; 
    this.marcaSeleccionada = '' ; 
    this.modeloSeleccionado = '' ; 
    this.tallaSeleccionada = '' ; 
    this.colorSeleccionado = '' ; 
  }

  public cambiarDatosDescripcion() : void {
    
    if (this.categoria!.value != '')
      this.categorriaSeleccionada = (this.categorias.find((categoria:Categoria) => categoria.cat_id == this.categoria?.value))!.cat_descripcion || " ";
    if(this.marca!.value != '')
      this.marcaSeleccionada =  (this.marcas.find((marca:Marca) => marca.mar_id == this.marca?.value))!.mar_descripcion || "";
    if(this.modelo!.value != '')
      this.modeloSeleccionado = (this.modelos.find((modelo:Modelo) => modelo.mod_id == this.modelo?.value))!.mod_descripcion || "";
    if(this.talla!.value != '')
      this.tallaSeleccionada =  `- ${(this.tallas.find((talla:Talla) => talla.tal_id == this.talla?.value))!.tal_descripcion} -`;
    if(this.color!.value != '')
      this.colorSeleccionado = (this.colores.find((color:Color) => color.col_id == this.color?.value))!.col_descripcion || "" ;

    this.descripcion?.setValue(`${this.categorriaSeleccionada} ${this.marcaSeleccionada} ${this.modeloSeleccionado} ${this.tallaSeleccionada} ${this.colorSeleccionado}`);
    
  }
  
  public capturarCategoria(categoria:string) : void {
    this.categorriaSeleccionada = categoria
  }

  public capturarMarca(marca: string) : void {
    this.marcaSeleccionada = marca;
  }

  public capturarModelo(modelo:string) : void {
    this.modeloSeleccionado = modelo;
  }

  public capturarTalla(talla:string){
    this.tallaSeleccionada = talla;
  }

  public capturarColor(color:string) : void { 
    this.colorSeleccionado = color
  }


  private _enviarInformacionDeProducto(producto:Producto) : void {
    const dataPeticion : DataProductoRegistroActualizar = {
      esRegistro : this.esRegistro,
      producto : {...producto}
    }
    this.enviarInformacionProducto.emit(dataPeticion)
  }

  private _culminarPeticion(): void {
    this.esRegistro==false?
      this.closeModal():
      this._reiniciarSeleccionDescripcion();
      this._reiniciarFormulario();
  }

  public closeModal(): void {
    this._reiniciarFormulario();
    this._reiniciarSeleccionDescripcion();
    this.esVisualizarModal = false;
    this.mostrarModal=false;
    this.esVisualizar.emit(false);
    this.cerrarModal.emit(false);
  }

  private _reiniciarFormulario(): void {
    this.productoFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges) : void {
    this.descripcion?.disable();
    if(changes['esVisualizarModal']){
      const visualizar : boolean = changes['esVisualizarModal'].currentValue
      visualizar?this.productoFormulario.disable():this.productoFormulario.enable()
    }

    if(changes['productoUtilizadoEnModal']){
      this.esRegistro = false ; 
      const producto : Producto = changes['productoUtilizadoEnModal'].currentValue

      this.productoFormulario.reset({
        codigo : producto?.prod_codigo,
        descripcion : producto?.prod_descripcion,
        precio_compra : producto?.prod_precio_compra,
        precio_venta : producto?.prod_precio_venta,
        precio_promocion : producto?.prod_descuento_promocion,
        proveedor : producto?.proveedor,
        talla : producto?.talla,
        categoria : producto?.categoria,
        modelo : producto?.modelo,
        marca : producto?.marca,
        color : producto?.color,
        estado : producto?.prod_estado,
      });
    }else{
      this.esRegistro = true ; 
    }

  }


}
