import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tienda } from 'src/app/models/tienda';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  @ViewChild('templateTienda')templateTiendaModal!: ElementRef;
  tienda:Tienda[]=[];

  constructor(
    private servTienda:TiendaService,
    private modal:NgbModal,
    private configModal:NgbModalConfig,
  ) { }

  ngOnInit(): void {
  }

  abrirModal(){
    // xs-sm-md-lg-xl-xxl
    this.modal.open(this.templateTiendaModal,{size:'md'});
  }
  closeModal(){
    this.modal.dismissAll();
  }
}
