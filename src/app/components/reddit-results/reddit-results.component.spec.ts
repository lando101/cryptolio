import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditResultsComponent } from './reddit-results.component';

describe('RedditResultsComponent', () => {
  let component: RedditResultsComponent;
  let fixture: ComponentFixture<RedditResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
