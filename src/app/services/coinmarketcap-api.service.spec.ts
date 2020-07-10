import { TestBed } from '@angular/core/testing';

import { CoinmarketcapApiService } from './coinmarketcap-api.service';

describe('CoinmarketcapApiService', () => {
  let service: CoinmarketcapApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinmarketcapApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
