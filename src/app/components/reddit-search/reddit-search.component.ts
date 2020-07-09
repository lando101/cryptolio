import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { RedditApiService } from '../../services/reddit-api.service';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrls: ['./reddit-search.component.scss']
})
export class RedditSearchComponent implements OnInit {

  searchForm: FormGroup;
  results: Observable<{}[]>;
  @Output() news = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private ras: RedditApiService) {
    this.searchForm = this.fb.group({
      query: ['']
    });

    // this.results = this.searchForm.controls.query.valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap((query: string) => this.ras.searchReddit(query)),
    //   map((result: any) => result.data.children),
    //   tap((posts: any) => console.log(posts))
    // );
  }

  search(query?:any){
    let search: any;
    if(!query){
      search = this.searchForm.controls.query.value;
    } else{
      search = query;
    }
    this.ras.searchReddit(search).subscribe(data =>{
      // console.log(data);
      this.results = data;
      // console.log(this.results);
      this.news.emit(this.results);
    } )
    // console.log(search);
  }
  ngOnInit() {
    this.search('Cryptocurrency news');
  }

}
