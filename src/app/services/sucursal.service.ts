import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private URL:string='http://localhost:8000/sucursales';

  constructor(private http:HttpClient) { }

  servicioListarSucursales():Observable<any>{
    const url = this.URL+'/lista-sucursal/';
    // console.log("OBTENCION DE URL");
    return this.http.get(url);
  }
  servicioRegistrarSucursales(sucursal: Sucursal):Observable<any>{
    const url=this.URL+'/crear/';
    // console.log("SE OBTUVO ENLACE DE REGISTRO sucursal");
    return this.http.post(url,sucursal);
  }

  servicioEditarSucursal(id:number,sucursal:Sucursal):Observable<any>{
    const url=this.URL+'/editar/'+id+'/';
    return this.http.put(url,sucursal);
  }

  // servicioEliminarSucursal(id:number):Observable<any>{
  //   const url=this.URL+'/eliminar/'+id+'/';
  //   return this.http.delete(url,id);
  // }

}
