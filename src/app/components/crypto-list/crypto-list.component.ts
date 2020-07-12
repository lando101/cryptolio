import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../../services/reddit-api.service';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { Crypto } from '../../model/crypto.model';
@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  constructor(private cryptoDataService: CoinmarketcapApiService) { }

  cryptoData: Array<any> = [];
  displayedColumns: string[] = ['crypto'];
  dataSource = this.cryptoData;
  cryptoShown: number = 20;
  searchValue: string = '';
  ngOnInit(): void {
    this.cryptoDataService.getTop100Crypto().subscribe(data =>{
      // console.log(data.Data);
      data.forEach((element: any, index: any) => {
        // if(element.price>=1){
        //   element.price = element.
        // } else{
        //   element.price = element.price.toFixed(4);
        // }
        if(element["1d"].price_change_pct === undefined){
          element.oneDayChange = 'Unknown';
          console.log("Found undefined");
        } else{
          element.oneDayChange = element["1d"].price_change_pct;
        }
        // if(element["1d"].price_change_pct != undefined){
        //   console.log(element["1d"].price_change_pct)
        // }
        this.cryptoData.push(element);
        // this.cryptoData[index].id = element.CoinInfo.Id;
      });
      console.log(data);
      console.log(this.cryptoData);
    })
  }
}
