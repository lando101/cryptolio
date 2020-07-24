import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of, Observer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { Socket } from 'dgram';



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
   socket: WebSocket;
   observer: Observer<any>;

   getCharts(): Observable<any>{
    const apiKey = "641209cc5125f295360f388673546b58ea5e5a6d26846d4b05bd03d61ef8e4f2";
    const url: WebSocket = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)

    this.socket = url;

    this.socket.onopen = (event:Event) => {
      let subRequest = {
              "action": "SubAdd",
              "subs": ["24~CCCAGG~BTC~USD~D"]
            };
      console.log("Socket has been opened!");
     this.socket.send(JSON.stringify(subRequest))
  };

    return this.createObservable();
   }


   createObservable() : Observable<number> {
    return new Observable(observer => {
      this.observer = observer;
    });
}
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
    let url = 'https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=' + symbol + '&api_key=641209cc5125f295360f388673546b58ea5e5a6d26846d4b05bd03d61ef8e4f2';
    let cryptoData = this.http.get(url);

    return cryptoData;
  }

  // GET CRYPTO DATA FROM NOMICS :: MORE ACCURATE THAN CRYPTOCOMPARE
  getTop100Crypto(): Observable<any> {
    const headers = new HttpHeaders()
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET");
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //https://cors-anywhere.herokuapp.com/ ALLOWS US TO GET PAST CORS ISSUE
    let cryptodata = this.http.get('https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=80d4c764744d253e4e1ddd3dec0c8137&interval=1h,1d,7d,30d,ytd&convert=USD', { headers });

    // console.log(cryptodata)
    return cryptodata;
  }

  // GET CHART DATA FOR CURRENCY MODAL
  getChartData(cryptoSymbol?: string): Observable<any> {
    let symbol = cryptoSymbol;
    let url = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=' + symbol + '&tsym=USD&limit=365';
    let cryptoData = this.http.get(url);

    return cryptoData;
  }

  getCoinNews(cryptoSymbol?: string): Observable<any>{
    let symbol = cryptoSymbol;
    let url = 'https://min-api.cryptocompare.com/data/v2/news/?categories='+ symbol +'&excludeCategories=Sponsored';
    let cryptoNews = this.http.get(url);

    return cryptoNews;
  }


  // GET THE MARKETCAP OF A SPECIFIC COIN
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

  // USING ACTIVE CURRENCIES COUNTER
  getGlobalStats() : Observable<any>{
    let url = 'https://api.coingecko.com/api/v3/global';
    let globalData = this.http.get(url);

    return globalData;
  }

  // ANNOUNCEMENTS
  getAnnouncments() : Observable<any>{
    let url = 'https://api.coingecko.com/api/v3/events';
    let announcements = this.http.get(url);

    return announcements;
  }



  // getTopTenMarketCap(): Observable<any>{


  //   return
  // }

  // CRYPTOCOMPARE WEBSOCKET DAILY VALUES
  // getOHLCDaily(): Observable<any> {
  //   const apiKey = "641209cc5125f295360f388673546b58ea5e5a6d26846d4b05bd03d61ef8e4f2";

  //   const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
  //   let dataDaily: any[];

  //   ccStreamer.onopen = function onStreamOpen() {
  //     let subRequest = {
  //       "action": "SubAdd",
  //       "subs": ["24~CCCAGG~BTC~USD~D"]
  //     };
  //     ccStreamer.send(JSON.stringify(subRequest));
  //   }

  //   ccStreamer.addEventListener('message', function (event) {
  //     console.log('Message from server ', event.data);
  // });

  //   // ccStreamer.onmessage = function onStreamMessage(message: any) {
  //   //   //@ts-ignore
  //   //   // message = event.data;
  //   //   var message = event.data;

  //   //   // console.log(JSON.stringify(data));
  //   //   // console.log("Received from Cryptocompare: " + message);
  //   //   // dataDaily = JSON.parse(dataDaily);


  //   //   // console.log(jsonPretty);
  //   //   // console.log(jsonPretty.TYPE)

  //   //   // console.log("Received from Cryptocompare: " + message);
  //   // }
  //   console.log(dataDaily);
  //   return of(dataDaily);
  // }


}
