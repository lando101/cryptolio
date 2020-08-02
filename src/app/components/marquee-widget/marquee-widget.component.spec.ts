import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeWidgetComponent } from './marquee-widget.component';

describe('MarqueeWidgetComponent', () => {
  let component: MarqueeWidgetComponent;
  let fixture: ComponentFixture<MarqueeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
