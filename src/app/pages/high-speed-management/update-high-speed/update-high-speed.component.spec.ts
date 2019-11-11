import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHighSpeedComponent } from './update-high-speed.component';

describe('UpdateHighSpeedComponent', () => {
  let component: UpdateHighSpeedComponent;
  let fixture: ComponentFixture<UpdateHighSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHighSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHighSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
