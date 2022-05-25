import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReporteCompraComponent } from './home-reporte-compra.component';

describe('HomeReporteCompraComponent', () => {
  let component: HomeReporteCompraComponent;
  let fixture: ComponentFixture<HomeReporteCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeReporteCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReporteCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
