import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  searchResult: Observable<any>;
  url: Observable<any>;
  // searchResult2: BehaviorSubject<string>;
  constructor(private http: HttpClient) { }

  searchReddit(query: string): Observable<any> {
    console.log('tried to search');
    // let result = this.http.get(`https://www.reddit.com/search.json?q=${query}`);
    let result = this.http.get('https://www.reddit.com/r/cryptocurrencynews.json');
    this.searchResult = result;
    this.getResults();
    return of(result);
    // console.log(this.http.get(`https://www.reddit.com/r/cryptocurrencynews.json`));
    // return this.http.get(`https://www.reddit.com/r/cryptocurrencynews.json`);
  }

  getResults(): Observable<any> {
    console.log('GET RESULTS FIRED');
    return this.searchResult;
  }

  setURL(url: Observable<any>){
    this.url = url;
  }

  getURL(): Observable<any>{
    return of(this.url);
  }
}
