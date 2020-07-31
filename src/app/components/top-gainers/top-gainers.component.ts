import { Component, OnInit } from '@angular/core';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { MatDialog } from '@angular/material/dialog';
import { CryptoDialogComponent } from '../crypto-dialog/crypto-dialog.component';

@Component({
  selector: 'app-top-gainers',
  templateUrl: './top-gainers.component.html',
  styleUrls: ['./top-gainers.component.scss']
})
export class TopGainersComponent implements OnInit {

  constructor(private cryptoDataService: CoinmarketcapApiService,  public dialog: MatDialog) { }
  cryptoData: Array<any> = [];
  tiltSettings: any;
  favoritedCoin: boolean = false;

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
        // if(index <= 4){
          if(element.id !== 'ETNX' && element.id !== 'CDAI' && element.id !=='VEN' && element.id !== 'CUSDC'){

            // console.log("Found undefined");
            element.oneDayChange = element["1d"]?.price_change_pct;
            this.cryptoData.push(element);

          }
      this.sortHotCoins();

        // }
      });
    })
  }

  // slides = [
  //   {img: "http://placehold.it/350x150/000000"},
  //   {img: "http://placehold.it/350x150/111111"},
  //   {img: "http://placehold.it/350x150/333333"},
  //   {img: "http://placehold.it/350x150/666666"}
  // ];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,

  };

  // addSlide() {
  //   this.slides.push({img: "http://placehold.it/350x150/777777"})
  // }

  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    // console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log('afterChange');
  }

  beforeChange(e: any) {
    // console.log('beforeChange');
  }

  sortHotCoins(){
    this.cryptoData = this.cryptoData.sort((n1, n2) => {
      if(n1.oneDayChange && n2.oneDayChange){
        if(Number(n1.oneDayChange) < Number(n2.oneDayChange)){
          return 1;
        }
        if(Number(n1.oneDayChange) > Number(n2.oneDayChange)){
          return -1;
        }
        return 0;
      }
    });
  }

  openDialog(crypto:any): void {
    if(!this.favoritedCoin){
      // console.log('TRIED TO OPEN DIALOG');
      let dialogRef = this.dialog.open(CryptoDialogComponent, {
        // width: '250px',
        data: { name: crypto.name, price: crypto.price, rank: crypto.rank, id: crypto.id,
          logo: crypto.logo_url, prct: crypto.oneDayChange, market_cap: crypto.market_cap,
          max_supply: crypto.max_supply, circulating_supply: crypto.circulating_supply,
          ath: crypto.high }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    }

  }

}
