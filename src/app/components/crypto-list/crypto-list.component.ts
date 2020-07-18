import { Component, OnInit } from '@angular/core';
import { RedditApiService } from '../../services/reddit-api.service';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { Crypto } from '../../model/crypto.model';
import { MatDialog } from '@angular/material/dialog';
import { CryptoDialogComponent } from '../crypto-dialog/crypto-dialog.component';


interface CoinFilter {
  value: any;
  viewValue: any;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})


export class CryptoListComponent implements OnInit {

  constructor(private cryptoDataService: CoinmarketcapApiService, public dialog: MatDialog,) { }

  cryptoData: Array<any> = [];
  displayedColumns: string[] = ['crypto'];
  dataSource = this.cryptoData;
  cryptoShown: number = 20;
  searchValue: string = '';


  selectedValue: string = 'All coins';
  selectedValuePeriod: string = '24h';
  selectedRange: any = 25;
  selectedSort: any = 'all';

  favoritedCoin: boolean = false;

  // selectedValuePeriodPretty: string = '24h';
  selectedCar: string;

  filters: CoinFilter[] = [
    {value: 'highest-market-cap', viewValue: 'Highest market cap'},
    {value: 'low-market-cap', viewValue: 'Lowest market cap'},
    {value: 'hot', viewValue: 'Hot coins'},
    {value: 'cold', viewValue: 'Cold coins'},
  ];

  periodFilter: CoinFilter[] = [
    {value: '1h', viewValue:'1H'},
    {value: '24h', viewValue: '24H'},
    {value: '7d', viewValue: '7D'},
    {value: '30d', viewValue: '30D'},
    {value: 'YTD', viewValue: 'YTD'},
  ];

  amountFilter: CoinFilter[] = [
    {value: 25, viewValue:'25 coins'},
    {value: 50, viewValue: '50 coins'},
    {value: 100, viewValue: '100 coins'},
  ];

  // cars: Car[] = [
  //   {value: 'volvo', viewValue: 'Volvo'},
  //   {value: 'saab', viewValue: 'Saab'},
  //   {value: 'mercedes', viewValue: 'Mercedes'}
  // ];


  ngOnInit(): void {
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
        if(index <= 100){
          if(element.id !== 'ETNX' && element.id !== 'CDAI' && element.id !=='VEN' && element.id !== 'CUSDC'){
            element.hourChange = element["1h"].price_change_pct;
            element.weekChange = element["7d"].price_change_pct;
            element.monthChange = element["30d"].price_change_pct;
            element.ytdChange = element.ytd.price_change_pct;
            element.oneDayChange = element["1d"].price_change_pct;
            // console.log("Found undefined");
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
      // console.log('THIS CAME FROM THE COIN LIST');
      // console.log(data);
      // console.log(this.cryptoData);
    })
  }

  sortRequest(type: string){
    console.log(type);
    if(type === 'hot'){
      this.sortHotCoins();
    } else if(type === 'cold'){
      this.sortColdCoins();
    } else if(type === 'highest-market-cap'){
      this.sortMarketCapHigh();
    } else if(type === 'low-market-cap'){
      this.sortMarketCapLow();
    }
  }

  sortMarketCapHigh(){
    this.cryptoData = this.cryptoData.sort((n1, n2) => {
      if(n1.market_cap && n2.market_cap){
        if(Number(n1.market_cap) < Number(n2.market_cap)){
          return 1;
        }
        if(Number(n1.market_cap) > Number(n2.market_cap)){
          return -1;
        }
        return 0;
      }
    });
    console.log(this.cryptoData);
  }

  sortMarketCapLow(){
    this.cryptoData = this.cryptoData.sort((n1, n2) => {
      if(n1.market_cap && n2.market_cap){
        if(Number(n1.market_cap) > Number(n2.market_cap)){
          return 1;
        }
        if(Number(n1.market_cap) < Number(n2.market_cap)){
          return -1;
        }
        return 0;
      }
    });
    console.log(this.cryptoData);
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
    console.log(this.cryptoData);
  }

  sortColdCoins(){
    this.cryptoData = this.cryptoData.sort((n1, n2) => {
      if(n1.oneDayChange && n2.oneDayChange){
        if(Number(n1.oneDayChange) > Number(n2.oneDayChange)){
          return 1;
        }
        if(Number(n1.oneDayChange) < Number(n2.oneDayChange)){
          return -1;
        }
        return 0;
      }
    });
    console.log(this.cryptoData);
  }

  openDialog(crypto:any): void {
    if(!this.favoritedCoin){
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

  favorited(event: any){
    console.log('I FAVORITED SOMETHING');
    this.favoritedCoin = true;
    setTimeout(() => {
      this.favoritedCoin = false;
    }, 500);
  }
}
