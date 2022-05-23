import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ButtonProgressService } from 'src/app/shared/services/button-progress.service';
import { IGV } from 'src/app/shared/utils/reutilizables';

import { DataProductoRegistroActualizar } from '../../models/registro-actualizar-producto.model';

//PRODUCTO
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

//MODELO
import { Modelo } from '../../../modelos/models/modelo.model';
import { ModeloService } from '../../../modelos/services/modelo.service';

//CATEGORIA
import { Categoria } from '../../../categorias/models/categoria.model';
import { CategoriaService } from '../../../categorias/services/categoria.service';

//COLOR
import { Color } from '../../../colores/models/color.model';
import { ColorService } from '../../../colores/services/color.service';

//TALLA
import { Talla } from '../../../tallas/models/talla.models';
import { TallaService } from '../../../tallas/services/talla.service';

//PROVEEDOR
import { Proveedor } from '../../../proveedores/models/proveedor.model';
import { ProveedorService } from '../../../proveedores/services/proveedor.service';

// MARCAR
import { Marca } from '../../../marcas/models/marca';
import { MarcaService } from '../../../marcas/services/marca.service';
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
    precio_promocion:['',[Validators.required,Validators.pattern(this.validarPrecios)]],
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
    console.log("valor de es visualizar modal inicizalizado: " + this.esVisualizarModal);
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
        prod_descuento_promocion: this.precio_promocion?.value,
        prod_precio_compra_base: this.precio_compra?.value * IGV,
        prod_precio_venta_base: this.precio_venta?.value * IGV,
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
      this._reiniciarFormulario();
  }

  public closeModal(): void {
    console.log(this.productoUtilizadoEnModal);
    console.log( this.productoFormulario.value);
    console.log(this.esVisualizarModal);
    
    
    this._reiniciarFormulario();
    this.esVisualizarModal = false;
    this.mostrarModal=false;
    this.esVisualizar.emit(false);
    this.cerrarModal.emit(false);
  }

  private _reiniciarFormulario(): void {
    this.productoFormulario.reset({...this._datosIniciales});
  }

  ngOnChanges(changes: SimpleChanges) : void {

    if(changes['esVisualizarModal']){
      const visualizar : boolean = changes['esVisualizarModal'].currentValue
      console.log(changes['esVisualizarModal']);
      
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
      this.esRegistro = false ; 
    }

  }


}
