import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRecordComponent } from './operator-record.component';

describe('OperatorRecordComponent', () => {
  let component: OperatorRecordComponent;
  let fixture: ComponentFixture<OperatorRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
