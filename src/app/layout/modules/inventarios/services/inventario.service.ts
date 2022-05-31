import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { environment } from 'src/environments/environment';
import { Tienda } from '../../tiendas/models/tienda.models';


@Injectable({
providedIn: 'root'
})
export class InventarioService {

private _url:string =environment.url;
constructor(private http:HttpClient) { }

public listarInventarioDeTienda(id_tienda : number):Observable<Respuesta>{
const url=`${ this._url }/inventarios/${id_tienda}/`;
console.log(url);

return this.http.get<Respuesta>(url)
.pipe(
    map(respuesta=>respuesta),
    catchError(err=>throwError(()=>err))
);
}

}
