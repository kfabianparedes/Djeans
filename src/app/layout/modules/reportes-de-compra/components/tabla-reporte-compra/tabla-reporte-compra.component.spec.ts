import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReporteCompraComponent } from './tabla-reporte-compra.component';

describe('TablaReporteCompraComponent', () => {
  let component: TablaReporteCompraComponent;
  let fixture: ComponentFixture<TablaReporteCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReporteCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReporteCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
