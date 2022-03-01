import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private URL:string='http://localhost:8000/tienda';

  constructor(private http:HttpClient) { }
  servicioListarSucursales():Observable<any>{
    const url = this.URL+'/lista';
    // console.log("OBTENCION DE URL");
    return this.http.get(url);
  }
}
