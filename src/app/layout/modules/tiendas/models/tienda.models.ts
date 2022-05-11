export interface Tienda{
  tie_id:number;
  tie_nombre:string;
  tie_estado:boolean;
  //REVISAR
  tie_suc_id:number;

  sucursal?: string;
  sucursalDireccion?: string;
  tiendaEstado?:string;
}
