import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartColor } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color, Colors } from 'ng2-charts';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { formatCurrency } from '@angular/common';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-market-cap-chart',
  templateUrl: './market-cap-chart.component.html',
  styleUrls: ['./market-cap-chart.component.scss']
})
export class MarketCapChartComponent implements OnInit {
  marketCap: any;
  cryptoLabels: Label[] = [];
  cryptoCaps: SingleDataSet = []
  btcDominance: any;
  btcMarketCap: any;
  totalMaretCap: any;
  pieChartOptions: ChartOptions;
  themeType = '';

  //PIE CHART VARIABLES
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType;
  public pieChartLegend: boolean;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors: any = []

  darkThemeColor = '#181818';
  lightThemeColor = '#fafafa';
  color = '';
  constructor(private cryptoData: CoinmarketcapApiService, private themeService: ThemeService) { }
  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
      if (data === 'light'){
        this.color = this. lightThemeColor
      } else{
        this.color = this.darkThemeColor;
      }
      this.createPieChart(this.color);

      console.log(this.color);
    });

    this.cryptoData.getTop100Crypto().subscribe(data =>{
      // console.log("PIE CHART GOT THE GOODS");
      this.marketCap = data;
      let restOfCryptos: any = 0;

      this.marketCap.forEach((element: any) => {

        if(element.rank <= 3){
          this.cryptoLabels.push(element.symbol);
          this.cryptoCaps.push(element.market_cap);
        } else if(element.rank > 3 && element.rank < 99) {
          restOfCryptos += Number(element.market_cap);
          // console.log(element.market_cap);
        }
      });
      this.calcBTCDom(this.cryptoCaps, restOfCryptos)

      this.cryptoCaps.push(restOfCryptos);
      this.cryptoLabels.push('Alts');

    });
  }

  // CALCULATE BTC DOMINANCE
  calcBTCDom(top: any, alts: number){
    let btcDom = 0;
    let btcCap = Number(top[0]);
    let total = Number(alts);

    top.forEach((element: any) => {
        total += Number(element);
    });

    btcDom = (btcCap/total);
    this.btcDominance = btcDom;
  }

  createPieChart(color: string){
    this.pieChartOptions = {
      cutoutPercentage: 90,
      elements: {
        arc: {
          borderWidth: 5,
        },
      },
      responsive: true,
      legend: {
        position: 'bottom',
      },
      plugins: {
      borderRadius: 4,

        datalabels: {
          // formatter: (value, ctx) => {
          //   const label = ctx.chart.data.labels[ctx.dataIndex];
          //   return label;
          // },
          color: 'black',
          font: {
            weight: 'bold',
            size: 9,
          },
          // font.size: '40'

        },
      }
    }
    this.pieChartLabels = this.cryptoLabels;
    this.pieChartData = this.cryptoCaps
    this.pieChartType = 'doughnut';
    this.pieChartLegend = false;
    this.pieChartColors = [
      {
        backgroundColor: ['#FF7F49', '#93CCEA', '#9DE093', '#93DFB8'],
        borderColor: color
      },
    ];
  }
  // pieChartOptions: ChartOptions = {

  // };


}
