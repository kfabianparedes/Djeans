import { Producto } from "src/app/layout/modules/productos/models/producto.model";

export interface DetalleDeCompra{
    det_comp_id: number ; 
    det_comp_cantidad: number; 
    det_comp_importe : number ;
    producto : number ; 
    compra: number ; 

    producto_descripcion : string ;

    productoDetalle? : Producto;
}