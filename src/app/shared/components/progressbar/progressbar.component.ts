import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProgressbarService } from '../../services/progressbar.service';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  constructor(private progressBarService: ProgressbarService) { }
  
  isLoading : Subject<boolean> = this.progressBarService.cargando;

  ngOnInit(): void {
  }

}
