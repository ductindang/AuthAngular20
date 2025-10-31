import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmotp } from './confirmotp';

describe('Confirmotp', () => {
  let component: Confirmotp;
  let fixture: ComponentFixture<Confirmotp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmotp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmotp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
