import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CryptoTimeData } from '@app/model/crypto-time-data.model';


@Component({
  selector: 'app-crypto-dialog',
  templateUrl: './crypto-dialog.component.html',
  styleUrls: ['./crypto-dialog.component.scss']
})
export class CryptoDialogComponent implements OnInit, AfterViewInit {
  loading: boolean;
  cryptoDataPrice: any;
  cryptoSignalData: any;
  dataId: any;

  dailyData: CryptoTimeData[] = [{time:'', value: 0}];

  constructor(
    public dialogRef: MatDialogRef<CryptoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cryptoData: CoinmarketcapApiService)  {

     }

  ngOnInit(): void {
    const dataId = this.data.id;
    let cryptoLowerCase: string;
    this.cryptoData.getCryptoData(dataId).subscribe(data =>{
      // console.log(data);

      this.cryptoDataPrice = data.DISPLAY[dataId].USD;
      console.log(this.cryptoDataPrice);
    });

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
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    (<any>window).twttr.widgets.load();
    console.log("TRIED TO INIT TWITTER");
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
