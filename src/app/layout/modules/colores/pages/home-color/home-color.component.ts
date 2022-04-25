import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-color',
  templateUrl: './home-color.component.html',
  styleUrls: ['./home-color.component.css'],
  providers: [MessageService]
})
export class HomeColorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
