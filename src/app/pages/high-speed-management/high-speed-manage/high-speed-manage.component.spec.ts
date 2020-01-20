import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSpeedManageComponent } from './high-speed-manage.component';

describe('HighSpeedManageComponent', () => {
  let component: HighSpeedManageComponent;
  let fixture: ComponentFixture<HighSpeedManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighSpeedManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighSpeedManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
