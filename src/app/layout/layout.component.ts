import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  claseEsconderSideBar: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  verificarEstadoSideBar(event:boolean):void{
    event===true?this.claseEsconderSideBar='sb-sidenav-toggled':this.claseEsconderSideBar=''
  }
}
