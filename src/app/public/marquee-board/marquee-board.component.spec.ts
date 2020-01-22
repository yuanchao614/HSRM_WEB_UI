import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeBoardComponent } from './marquee-board.component';

describe('MarqueeBoardComponent', () => {
  let component: MarqueeBoardComponent;
  let fixture: ComponentFixture<MarqueeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
