import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontUserComponent } from './font-user.component';

describe('FontUserComponent', () => {
  let component: FontUserComponent;
  let fixture: ComponentFixture<FontUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
