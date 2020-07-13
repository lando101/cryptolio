import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';

@Component({
  selector: 'app-market-cap-chart',
  templateUrl: './market-cap-chart.component.html',
  styleUrls: ['./market-cap-chart.component.scss']
})
export class MarketCapChartComponent implements OnInit {


  constructor(private cryptoData: CoinmarketcapApiService) { }
  ngOnInit(): void {
    this.cryptoData.getMarketCap().subscribe(data =>{
      console.log(data);
      console.log('GOT THE GOODS');
    });
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [{
    afterLayout: function (chart: { legend: { legendItems: any[]; }; data: { datasets: { data: { [x: string]: any; }; }[]; }; }) {
      chart.legend.legendItems.forEach(
        (label: { index: string | number; text: string; }) => {
          let value = chart.data.datasets[0].data[label.index];

          label.text += ' ' + value;
          return label;
        }
      )
    }
  }];

}
