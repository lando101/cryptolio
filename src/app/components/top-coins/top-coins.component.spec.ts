import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCoinsComponent } from './top-coins.component';

describe('TopCoinsComponent', () => {
  let component: TopCoinsComponent;
  let fixture: ComponentFixture<TopCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
