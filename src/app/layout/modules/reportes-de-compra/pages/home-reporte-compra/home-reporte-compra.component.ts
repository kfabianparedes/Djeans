import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Respuesta } from 'src/app/shared/models/respuesta.model';
import { errorAlerta } from 'src/app/shared/utils/reutilizables';

@Component({
  selector: 'app-home-reporte-compra',
  templateUrl: './home-reporte-compra.component.html',
  styleUrls: ['./home-reporte-compra.component.css']
})
export class HomeReporteCompraComponent implements OnInit{
  // implements OnInit
  constructor() { }

  date1!: Date;
  date2!: Date;
  date3!: Date;
  date4!: Date;
  date5!: Date;
  date6!: Date;
  date7!: Date;
  date8!: Date;
  date9!: Date;
  date10!: Date;
  date11!: Date;
  date12!: Date;
  date13!: Date;
  date14!: Date;
  dates!: Date[];
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  invalidDates!: Array<Date>;

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];

  }

}
