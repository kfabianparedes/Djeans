import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'subtitulo-pagina',
  templateUrl: './subtitulo-pagina.component.html',
  styleUrls: ['./subtitulo-pagina.component.css']
})
export class SubtituloPaginaComponent implements OnInit {
  @Input() subTitulo: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
