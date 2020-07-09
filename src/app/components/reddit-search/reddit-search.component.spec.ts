import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditSearchComponent } from './reddit-search.component';

describe('RedditSearchComponent', () => {
  let component: RedditSearchComponent;
  let fixture: ComponentFixture<RedditSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
