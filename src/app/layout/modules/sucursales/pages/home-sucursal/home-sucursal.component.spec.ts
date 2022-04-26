import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSucursalComponent } from './home-sucursal.component';

describe('HomeSucursalComponent', () => {
  let component: HomeSucursalComponent;
  let fixture: ComponentFixture<HomeSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
