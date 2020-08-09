import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CryptoTimeData } from '@app/model/crypto-time-data.model';
import { AuthenticationService } from '@app/auth/authentication.service';
import { ThemeService } from '@app/services/theme.service';


@Component({
  selector: 'app-crypto-dialog',
  templateUrl: './crypto-dialog.component.html',
  styleUrls: ['./crypto-dialog.component.scss']
})
export class CryptoDialogComponent implements OnInit, AfterViewInit {
  loading: boolean;
  cryptoDataPrice: any;
  cryptoSignalData: any;
  cryptoNews: any;
  dataId: any;
  containerHeight: any;
  commentHeight: any;
  bodyHeight: any;
  themeType = '';
  dailyData: CryptoTimeData[] = [{time:'', value: 0}];

  constructor(
    public dialogRef: MatDialogRef<CryptoDialogComponent>,private el:ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any, private cryptoData: CoinmarketcapApiService,
    private coinData: AuthenticationService, private themeService: ThemeService)  {

     }

  @ViewChild('scroll')
  scroll: ElementRef;

  // @ViewChild('scrollBody')
  // scrollBody: ElementRef;

  tiltSettings: any;

  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
    });

    const dataId = this.data.id;
    let cryptoLowerCase: string;
    this.cryptoData.getCryptoData(dataId).subscribe(data =>{
      // console.log(data);

      this.cryptoDataPrice = data.DISPLAY[dataId].USD;
      // console.log(this.cryptoDataPrice);
    });

    this.cryptoData.getCoinNews(dataId).subscribe(data =>{
      // console.log(data);
      this.cryptoNews = data;
    })

    this.cryptoData.getSignalData(dataId).subscribe(data =>{
      cryptoLowerCase = data.Data.inOutVar.sentiment;
      this.cryptoSignalData = cryptoLowerCase.charAt(0).toUpperCase() + cryptoLowerCase.slice(1)

      console.log(this.cryptoSignalData);
    });

    // this.cryptoData.getOHLCDaily().subscribe(data =>{
    //   console.log('OHLC DATA SUBSCRIBED TO');

    //     if(data.TYPE === 24){
    //       this.dailyData.push({time: data.TS, value: data.CLOSE});
    //     }
    //   console.log(data);
    //   // console.log(this.dailyData);
    //   // console.log(data);
    // });



    this.tiltSettings =
      {
        reverse:                true,  // reverse the tilt direction
        max:                    35,     // max tilt rotation (degrees)
        startX:                 0,      // the starting tilt on the X axis, in degrees.
        startY:                 0,      // the starting tilt on the Y axis, in degrees.
        perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:                  1.1,      // 2 = 200%, 1.5 = 150%, etc..
        speed:                  800,    // Speed of the enter/exit transition
        transition:             true,   // Set a transition on enter/exit.
        axis:                   null,   // What axis should be disabled. Can be X or Y.
        reset:                  true,    // If the tilt effect has to be reset on exit.
        easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
        glare:                  true ,  // if it should have a "glare" effect
        "max-glare":            .1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
        // "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
        //                                 // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        // "mouse-event-element":  null    // css-selector or link to HTML-element what will be listen mouse events
        //                                 // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        // gyroscope:              true    // Boolean to enable/disable device orientation detection,
        // gyroscopeMinAngleX:     -45     // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
        // gyroscopeMaxAngleX:     45      // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
        // gyroscopeMinAngleY:     -45     // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
        // gyroscopeMaxAngleY:     45      // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
    }
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    (<any>window).twttr.widgets?.load();
    // console.log("TRIED TO INIT TWITTER");
    this.containerHeight = this.scroll.nativeElement.offsetHeight-48 + "px";
    this.commentHeight = this.scroll.nativeElement.offsetHeight-200 + "px";
    // console.log(this.scroll.nativeElement.offsetHeight-48 +"px");
    setTimeout(() => {
    this.bodyHeight = this.scroll.nativeElement.offsetHeight-114 + "px";
    // console.log(this.bodyHeight);
    }, 700);
    // this.bodyHeight = this.scrollBody.nativeElement.offsetHeight-515 + "px";
}

  onResize(){
    this.bodyHeight = this.scroll.nativeElement.offsetHeight-114 + "px";
    this.containerHeight = this.scroll.nativeElement.offsetHeight-48 + "px";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
