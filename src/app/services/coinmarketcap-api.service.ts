import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


declare var require: any;
@Injectable({
  providedIn: 'root'
})

export class CoinmarketcapApiService {
  private cryptoValues: Array<any>;

  observableCryptoValues: any;
  constructor(private http: HttpClient) {

   }
  public dataSource = new BehaviorSubject<number>(0);


  // GET CRYPTO VALUES FROM CRYPTOCOMPARE
  getCryptoData(cryptoSymbol?: string): Observable<any> {
    let symbol = cryptoSymbol;
    let url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + symbol + '&tsyms=USD'
    let cyprtoData = this.http.get(url);
    // console.log(url);

    return cyprtoData;
  }

  // GET CRYPTO SIGNAL DATA FROM CRYPTOCOMPARE
  getSignalData(cryptoSymbol?: string): Observable<any> {
    let symbol = cryptoSymbol;
    let url = 'https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=' + symbol;
    let cryptoData = this.http.get(url);

    return cryptoData;
  }

  // GET CRYPTO DATA FROM NOMICS :: MORE ACCURATE THAN CRYPTOCOMPARE
  getTop100Crypto(): Observable<any> {
    const headers = new HttpHeaders()
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    let cryptodata = this.http.get('https://api.nomics.com/v1/currencies/ticker?key=80d4c764744d253e4e1ddd3dec0c8137', { headers });

    return cryptodata;
  }

  getMarketCap(): Observable<any> {
    let marketCapGlobal: any;
    let marketCapCalc: number = 0;

    // return this.dataSource.asObservable();
    this.getTop100Crypto().subscribe(data => {
      // this.crypto.next(data);
      console.log(data);
      data.forEach((element: any) => {
        if (element.rank <= 100) {
          marketCapCalc += Number(element.market_cap);
        }
      });
      // console.log(marketCapCalc);
      this.dataSource.next(marketCapCalc);
    });

    return this.dataSource;
  }

  // CRYPTOCOMPARE WEBSOCKET DAILY VALUES
  getOHLCDaily(): Observable<any> {
    const apiKey = "641209cc5125f295360f388673546b58ea5e5a6d26846d4b05bd03d61ef8e4f2";

    const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
    let dataDaily: any;

    ccStreamer.onopen = function onStreamOpen() {
      let subRequest = {
        "action": "SubAdd",
        "subs": ["24~CCCAGG~BTC~USD~D"]
      };
      ccStreamer.send(JSON.stringify(subRequest));
    }

    ccStreamer.onmessage = function onStreamMessage(message: any) {
      //@ts-ignore
      // message = event.data;
      dataDaily = message.data;
      // console.log(JSON.stringify(data));
      dataDaily = JSON.parse(dataDaily);
      // console.log(jsonPretty);
      // console.log(jsonPretty.TYPE)

      // console.log("Received from Cryptocompare: " + message);
    }
    return of(ccStreamer.onmessage);
  }


}
