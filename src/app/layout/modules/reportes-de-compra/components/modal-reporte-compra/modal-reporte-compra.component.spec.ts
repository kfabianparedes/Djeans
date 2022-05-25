import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReporteCompraComponent } from './modal-reporte-compra.component';

describe('ModalReporteCompraComponent', () => {
  let component: ModalReporteCompraComponent;
  let fixture: ComponentFixture<ModalReporteCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReporteCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReporteCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
