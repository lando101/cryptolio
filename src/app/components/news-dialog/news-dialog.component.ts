import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RedditApiService } from '@app/services/reddit-api.service';


@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit{
  externalSite: SafeHtml = '';
  loading: boolean = true;
  constructor(
    private ras: RedditApiService,
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)  {

     }
     ngOnInit(): void {
      this.ras.getURL().subscribe(data => {
        setTimeout(() => {
        this.photoURL(data);
        }, 400);
        this.loading = true;
      })
    }


     onNoClick(): void {
      this.dialogRef.close();
    }

    photoURL(url: string) {
      console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
      this.externalSite = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return this.externalSite;
    }

    onFrameLoad(event: any){
      console.log(event);
      this.loading = false;
    }

}
