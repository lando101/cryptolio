import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-marquee-widget',
  templateUrl: './marquee-widget.component.html',
  styleUrls: ['./marquee-widget.component.scss']
})
export class MarqueeWidgetComponent implements OnInit {

  themeType = '';
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {



    // INITIATE JAVASCRIPT ON INIT
    get("https://www.livecoinwatch.com/static/lcw-widget.js", () => {
      //Google Maps library has been loaded...
    });

    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
    });
  }

}
