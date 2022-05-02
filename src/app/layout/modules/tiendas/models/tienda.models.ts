import { Sucursal } from "src/app/models/sucursal";

export interface Tienda{
  tie_id:number;
  tie_nombre:string;
  tie_estado:boolean;
  //REVISAR
  tie_suc_id:Sucursal;

  tiendaEstado?:string;
}
