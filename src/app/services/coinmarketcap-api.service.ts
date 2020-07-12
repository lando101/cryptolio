import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare var require: any;
@Injectable({
  providedIn: 'root'
})

export class CoinmarketcapApiService {

  constructor(private http: HttpClient) { }

  // GET CRYPTO VALUES
  getCryptoData(): Observable<any>{
    // let cyprtoData = this.http.get('https://api.nomics.com/v1/exchange-rates?key=80d4c764744d253e4e1ddd3dec0c8137');
    let cyprtoData = this.http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR');
    console.log(cyprtoData);
    return cyprtoData;
  }

  getTop100Crypto(): Observable<any>{
    const headers = new HttpHeaders()
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    let cryptodata = this.http.get('https://api.nomics.com/v1/currencies/ticker?key=80d4c764744d253e4e1ddd3dec0c8137', {headers});
    // console.log(cryptodata);
    return cryptodata;
  }


}
