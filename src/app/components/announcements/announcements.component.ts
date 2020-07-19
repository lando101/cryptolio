import { Component, OnInit } from '@angular/core';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  constructor(private cryptoData: CoinmarketcapApiService) { }

  announcements: any = '';
  tiltSettings: any;

  ngOnInit(): void {
    this.cryptoData.getAnnouncments().subscribe(data => {
      this.announcements = data.data;
      console.log(this.announcements);
      console.log('Announcemnts');
    });

    this.tiltSettings =
    {
      reverse: true,  // reverse the tilt direction
      max: 3,     // max tilt rotation (degrees)
      startX: 0,      // the starting tilt on the X axis, in degrees.
      startY: 0,      // the starting tilt on the Y axis, in degrees.
      perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
      scale: 1.02,      // 2 = 200%, 1.5 = 150%, etc..
      speed: 800,    // Speed of the enter/exit transition
      transition: true,   // Set a transition on enter/exit.
      axis: null,   // What axis should be disabled. Can be X or Y.
      reset: true,    // If the tilt effect has to be reset on exit.
      easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
      glare: true,  // if it should have a "glare" effect
      "max-glare": .1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    }
  }


}
