import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHighSpeedComponent } from './add-high-speed.component';

describe('AddHighSpeedComponent', () => {
  let component: AddHighSpeedComponent;
  let fixture: ComponentFixture<AddHighSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHighSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHighSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
