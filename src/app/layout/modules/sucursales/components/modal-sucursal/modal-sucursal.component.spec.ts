import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSucursalComponent } from './modal-sucursal.component';

describe('ModalSucursalComponent', () => {
  let component: ModalSucursalComponent;
  let fixture: ComponentFixture<ModalSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
