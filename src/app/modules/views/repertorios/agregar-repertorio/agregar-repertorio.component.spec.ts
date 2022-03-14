import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRepertorioComponent } from './agregar-repertorio.component';

describe('AgregarRepertorioComponent', () => {
  let component: AgregarRepertorioComponent;
  let fixture: ComponentFixture<AgregarRepertorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRepertorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRepertorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
