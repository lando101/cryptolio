import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../../services/reddit-api.service';
import { news } from '@app/model/news.model';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-reddit-results',
  templateUrl: './reddit-results.component.html',
  styleUrls: ['./reddit-results.component.scss']
})
export class RedditResultsComponent implements OnInit {

  constructor(private ras: RedditApiService, public dialog: MatDialog, public cleanUrl: DomSanitizer) { }
  news:news[] = [];
  ngOnInit(): void {
    this.ras.getResults().subscribe(data => {
      let results = data.data.children;
      // console.log("received news");

      // console.log(results.length);
      results.forEach((element: any) => {
        this.news.push(element.data)
      });
      // console.log(this.news);
    });


    // this.ras.getResults().pipe(debounceTime(500)).
  }
  openDialog(url:any): void {
    this.ras.setURL(url);
    let dialogRef = this.dialog.open(NewsDialogComponent, {
      // width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  // receiveNews(news: any) {
  //   this.news.push(news);
  //   console.log("recieved news");
  // }

}
