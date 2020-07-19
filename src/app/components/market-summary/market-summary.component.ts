import { Component, OnInit } from '@angular/core';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';


@Component({
  selector: 'app-market-summary',
  templateUrl: './market-summary.component.html',
  styleUrls: ['./market-summary.component.scss']
})
export class MarketSummaryComponent implements OnInit {

  constructor(private cryptoData: CoinmarketcapApiService) { }
  globalData: any;
  globalMrkCapChange: any;
  upOrDown: string;
  ngOnInit(): void {
    this.cryptoData.getGlobalStats().subscribe(data => {
      this.globalData = data;
      this.globalMrkCapChange = (Number(data.data.market_cap_change_percentage_24h_usd)/100);
      if(this.globalMrkCapChange < 0){
        this.upOrDown = "down";
      } else if(this.globalMrkCapChange >= 0){
        this.upOrDown = "up"
      }
      console.log(data);
      console.log('GOT GLOBAL DATA');
    });
  }

}
