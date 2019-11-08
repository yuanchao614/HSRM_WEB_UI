import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProleComponent } from './user-prole.component';

describe('UserProleComponent', () => {
  let component: UserProleComponent;
  let fixture: ComponentFixture<UserProleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
