import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiendaComponent } from './listar-tienda.component';

describe('ListarTiendaComponent', () => {
  let component: ListarTiendaComponent;
  let fixture: ComponentFixture<ListarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
