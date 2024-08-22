import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticaExamenComponent } from './practica-examen.component';

describe('PracticaExamenComponent', () => {
  let component: PracticaExamenComponent;
  let fixture: ComponentFixture<PracticaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticaExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
