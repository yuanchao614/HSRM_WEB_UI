import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineComponent } from './add-line.component';

describe('AddLineComponent', () => {
  let component: AddLineComponent;
  let fixture: ComponentFixture<AddLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
