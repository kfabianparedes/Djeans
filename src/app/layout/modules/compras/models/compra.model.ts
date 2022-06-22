export interface Compra{
    comp_id : number ; 
    comp_importe_total : number ; 
    comp_fecha_emision : string;
    comp_fecha_registro : string ; 
    comp_serie : number ; 
    comp_numero : number ; 
    comp_ingresada : number ; 
    usuario : number ; 
    proveedor : number ; 
    tipo_comprobante: number;

    compraEstado?: string ; 

    usuario_descripcion ?: string ; 
    proveedor_descripcion ?: string ;
    tipo_comprobante_descripcion?: string  
}