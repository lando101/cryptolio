import { Injectable } from '@angular/core';
declare var require: any;
@Injectable({
  providedIn: 'root'
})

export class CoinmarketcapApiService {

  constructor() { }

  getCryptoData() {
    const CoinMarketCap = require('coinmarketcap-api');
    const apiKey = '51a97757-802c-4e8e-97a0-72a34704126b';

    const client = new CoinMarketCap(apiKey)
    client.getTickers().then(console.log).catch(console.error);
  }
}
