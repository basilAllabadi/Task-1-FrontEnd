import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesStudentComponent } from './grades.component';

describe('GradesComponent', () => {
  let component: GradesStudentComponent;
  let fixture: ComponentFixture<GradesStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
