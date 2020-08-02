import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';

@Component({
  selector: 'app-marquee-widget',
  templateUrl: './marquee-widget.component.html',
  styleUrls: ['./marquee-widget.component.scss']
})
export class MarqueeWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    get("https://www.livecoinwatch.com/static/lcw-widget.js", () => {
      //Google Maps library has been loaded...
    });
  }

}
