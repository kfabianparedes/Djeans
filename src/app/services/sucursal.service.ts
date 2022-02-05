import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private URL:string='http://localhost:8000/sucursales';
  
  constructor(private http:HttpClient) { }

  servicioListarSucursales():Observable<any>{
    const url = this.URL+'/lista-sucursal';
    console.log("OBTENCION DE URL");
    return this.http.get(url);
  }

}
