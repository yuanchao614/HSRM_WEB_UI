import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSpeedManagementComponent } from './high-speed-management.component';

describe('HighSpeedManagementComponent', () => {
  let component: HighSpeedManagementComponent;
  let fixture: ComponentFixture<HighSpeedManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighSpeedManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighSpeedManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
