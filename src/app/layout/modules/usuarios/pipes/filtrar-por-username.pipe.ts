import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarPorUsername'
})
export class FiltrarPorUsernamePipe implements PipeTransform {

  transform(usuarios: any, arg: string): any[] {
    let listaDeUsuariosFiltrados = [];
    for(let usuario of usuarios){
      if(usuario.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
        listaDeUsuariosFiltrados.push(usuario);
      };
    };
    return listaDeUsuariosFiltrados;
  }

}
