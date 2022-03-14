import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'titulo-pagina',
  templateUrl: './titulo-pagina.component.html',
  styleUrls: ['./titulo-pagina.component.css']
})
export class TituloPaginaComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() subTitulo: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
