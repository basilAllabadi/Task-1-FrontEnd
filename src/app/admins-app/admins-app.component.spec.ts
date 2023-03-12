import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsAppComponent } from './admins-app.component';

describe('AdminsAppComponent', () => {
  let component: AdminsAppComponent;
  let fixture: ComponentFixture<AdminsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
