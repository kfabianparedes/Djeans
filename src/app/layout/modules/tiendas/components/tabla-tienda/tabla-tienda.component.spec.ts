import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTiendaComponent } from './tabla-tienda.component';

describe('TablaTiendaComponent', () => {
  let component: TablaTiendaComponent;
  let fixture: ComponentFixture<TablaTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
