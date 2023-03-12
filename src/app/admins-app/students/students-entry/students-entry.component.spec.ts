import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsEntryComponent } from './students-entry.component';

describe('StudentsEntryComponent', () => {
  let component: StudentsEntryComponent;
  let fixture: ComponentFixture<StudentsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
