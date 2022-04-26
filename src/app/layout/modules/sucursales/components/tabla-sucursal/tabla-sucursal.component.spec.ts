import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSucursalComponent } from './tabla-sucursal.component';

describe('TablaSucursalComponent', () => {
  let component: TablaSucursalComponent;
  let fixture: ComponentFixture<TablaSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
