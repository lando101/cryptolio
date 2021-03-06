import { Component, OnInit } from '@angular/core';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { ThemeService } from '@app/services/theme.service';


@Component({
  selector: 'app-market-summary',
  templateUrl: './market-summary.component.html',
  styleUrls: ['./market-summary.component.scss']
})
export class MarketSummaryComponent implements OnInit {
  themeType = '';
  constructor(private cryptoData: CoinmarketcapApiService, private themeService: ThemeService) { }
  globalData: any;
  globalMrkCapChange: any;
  upOrDown: string;
  marketCap: number = 0;

  ngOnInit(): void {

    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
    });

    this.cryptoData.getGlobalStats().subscribe(data => {
      this.globalData = data.data;
      try {
        this.globalMrkCapChange = (Number(data.data.market_cap_change_percentage_24h_usd)/100);
        if(this.globalMrkCapChange < 0){
          this.upOrDown = "down";
        } else if(this.globalMrkCapChange >= 0){
          this.upOrDown = "up"
        }
        // console.log(data);
        // console.log('GOT GLOBAL DATA');
      } catch (error) {
        // console.log('Error in market summar');
      }

    });

    this.cryptoData.getMarketCap().subscribe(data =>{
      // console.log("HEADER GOT THE GOODS");
      this.marketCap = data;
    });
  }

}
