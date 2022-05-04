export interface Proveedor{
    pro_id: number ;
    pro_nombre: string; 
    pro_ruc : string ; 
    pro_razon_social : string ; 
    pro_email : string ; 
    pro_telefono1 : string ; 
    pro_telefono2 : string ; 
    pro_direccion1 : string ; 
    pro_direccion2 : string ; 
    pro_estado : boolean ; 

    proveedorEstado?: string;
}