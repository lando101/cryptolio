import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }


  getCoinNews(cryptoSymbol?: string): Observable<any>{
    let symbol = cryptoSymbol;
    let url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
    let cryptoNews = this.http.get(url);

    return cryptoNews;
  }
}
