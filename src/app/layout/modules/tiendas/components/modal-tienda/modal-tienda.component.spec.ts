import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTiendaComponent } from './modal-tienda.component';

describe('ModalTiendaComponent', () => {
  let component: ModalTiendaComponent;
  let fixture: ComponentFixture<ModalTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
