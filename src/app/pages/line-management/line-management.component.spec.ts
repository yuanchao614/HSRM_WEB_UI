import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineManagementComponent } from './line-management.component';

describe('LineManagementComponent', () => {
  let component: LineManagementComponent;
  let fixture: ComponentFixture<LineManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
