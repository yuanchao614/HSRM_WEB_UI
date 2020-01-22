import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAvctorComponent } from './upload-avctor.component';

describe('UploadAvctorComponent', () => {
  let component: UploadAvctorComponent;
  let fixture: ComponentFixture<UploadAvctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAvctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAvctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
