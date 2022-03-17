import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public subtituloUsuario = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  public obtenerSubtitulo(event:any): void {
    this.subtituloUsuario = event;
  }
}
