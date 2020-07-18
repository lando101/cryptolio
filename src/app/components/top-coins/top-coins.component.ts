import { Component, OnInit } from '@angular/core';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
@Component({
  selector: 'app-top-coins',
  templateUrl: './top-coins.component.html',
  styleUrls: ['./top-coins.component.scss']
})
export class TopCoinsComponent implements OnInit {

  constructor(private cryptoDataService: CoinmarketcapApiService) { }
  cryptoData: Array<any> = [];
  tiltSettings: any;
  ngOnInit(): void {
    this.tiltSettings =
    {
      reverse: true,  // reverse the tilt direction
      max: 15,     // max tilt rotation (degrees)
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
    this.cryptoDataService.getTop100Crypto().subscribe(data =>{
      // console.log(data);
      data.forEach((element: any, index: any) => {
        // this.cryptoDataService.getSignalData(element.id).subscribe(data => {
        //   // console.log(data);
        //   if(data.Response === 'Success'){
        //     element.sentiment = '';
        //     element.sentiment = data.Data.inOutVar.sentiment;
        //   }
        //   // console.log(element.sentiment);
        //   console.log(data);
        // });
        if(index <= 7){
          if(element.id !== 'ETNX' && element.id !== 'CDAI' && element.id !=='VEN' && element.id !== 'CUSDC'){

            // console.log("Found undefined");
            element.oneDayChange = element["1d"].price_change_pct;
            this.cryptoData.push(element);

          }
        }


        // console.log(element.weekChange);
        // if(element["1d"].price_change_pct != undefined){
        //   console.log(element["1d"].price_change_pct)
        // }
        // this.cryptoData[index].id = element.CoinInfo.Id;
      });
      console.log(data);
      console.log(this.cryptoData);
      console.log("TOP COINS GOt THE GOODS");
      // console.log('THIS CAME FROM THE COIN LIST');
      // console.log(data);
      // console.log(this.cryptoData);
    })
  }

}
