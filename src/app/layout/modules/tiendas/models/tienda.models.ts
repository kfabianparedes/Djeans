import { Sucursal } from "../../sucursales/models/sucursal.model";
export interface Tienda{
  tie_id:number;
  tie_nombre:string;
  tie_estado:boolean;
  //REVISAR
  tie_suc_id:Sucursal;

  tiendaEstado?:string;
}
