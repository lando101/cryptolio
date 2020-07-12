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

  ngOnInit(): void {
    this.cryptoDataService.getTop100Crypto().subscribe(data =>{
      // console.log(data.Data);
      data.Data.forEach((element: any, index: any) => {
        this.cryptoData.push(element.CoinInfo);
        // this.cryptoData[index].id = element.CoinInfo.Id;
      });
      console.log(this.cryptoData);
    })
  }


}
