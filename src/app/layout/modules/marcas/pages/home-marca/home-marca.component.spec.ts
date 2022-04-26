import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMarcaComponent } from './home-marca.component';

describe('HomeMarcaComponent', () => {
  let component: HomeMarcaComponent;
  let fixture: ComponentFixture<HomeMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
