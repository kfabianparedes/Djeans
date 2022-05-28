import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'compra-guia-remision',
  templateUrl: './guia-remision.component.html',
  styleUrls: ['./guia-remision.component.css']
})
export class GuiaRemisionComponent implements OnInit {

  public todayDate =  new Date();
  public tomorrowDate =  new Date(this.todayDate.setDate(this.todayDate.getDate()));
  
  constructor() { }

  ngOnInit(): void {
  }

}
