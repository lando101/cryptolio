import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCommentsComponent } from './coin-comments.component';

describe('CoinCommentsComponent', () => {
  let component: CoinCommentsComponent;
  let fixture: ComponentFixture<CoinCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
