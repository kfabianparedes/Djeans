export interface Producto{
    prod_id: number; 
    prod_codigo : string ; 
    prod_descripcion : string ;
    prod_precio_compra_base : number ; 
    prod_precio_compra: number ;
    prod_precio_venta_base : number ;
    prod_precio_venta : number ; 
    prod_descuento_promocion: number ; 
    
    //ids de mantenedores
    proveedor : number ;
    talla : number ; 
    marca : number ; 
    modelo : number ; 
    color : number ; 
    categoria : number ;
  
    //strings mantenedores 

    proveedorDescripcion?: string;
    tallaDescripcion?: string;
    marcaDescripcion?: string;
    modeloDescripcion?: string;
    colorDescripcion?: string;
    categoriaDescripcion?: string;

    prod_estado : boolean ;
    productoEstado?: string ; 
}