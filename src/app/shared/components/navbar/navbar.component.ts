import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() activarSideBar = new EventEmitter<boolean>();
  esconder: boolean = false;
  // @ViewChild('#sidebarbtn') btnActivarSideBar!: ElementRef
  constructor(private render: Renderer2) { }

  ngOnInit(): void {
  }

  estadoSideBar():void{
    this.esconder===true?
      this.esconder = false:
      this.esconder = true;
    this.activarSideBar.emit(this.esconder);
  }

}
