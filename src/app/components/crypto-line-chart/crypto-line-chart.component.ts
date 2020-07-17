import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import { CryptoTimeData } from '@app/model/crypto-time-data.model';
import { createChart } from 'lightweight-charts';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-crypto-line-chart',
  templateUrl: './crypto-line-chart.component.html',
  styleUrls: ['./crypto-line-chart.component.scss'],
  providers: [DatePipe]
})
export class CryptoLineChartComponent implements OnInit, AfterViewInit  {

  constructor(private el:ElementRef, private chartDataService: CoinmarketcapApiService, public datepipe: DatePipe) { }
  @ViewChild('grid')
  grid: ElementRef;
  width: number;
  @Input() cryptoSymbol: string;
  // height: 500;
  cryptoDailyData: any;
  ngOnInit(): void {
    // this.width = this.grid.nativeElement.offsetWidth;
    // this.cryptoDailyData = this.getOCHLdaily();
    // console.log(this.cryptoDailyData);
// document.body.appendChild(container);
  }

  chart: any;
  chartData: any = '';
  prettyChartData: CryptoTimeData[] = [];
  ngAfterViewInit() {
    this.chartDataService.getChartData(this.cryptoSymbol).subscribe(data => {
      this.chartData = data;
      let now = moment();

      data.Data.Data.forEach((element: any) => {
        this.prettyChartData.push({time: moment.unix(element.time).format('YYYY-MM-DD'), value: element.close});
      });
    })

    setTimeout(() => {
      document.body.style.position = 'relative';

    var container = document.createElement('div');
      document.getElementById('grid').appendChild(container);

    var width = this.grid.nativeElement.offsetWidth;
    var height = 400;

    this.chart = createChart(container, {
      timeScale: {
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        horzLines: {
          color: '#eee',
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        vertLine: {
          labelVisible: false,
        },
      },
    });

    this.chart.resize((this.grid.nativeElement.offsetWidth-30), height, true);


    // chart.res
    var series = this.chart.addAreaSeries({
      topColor: 'rgba(0, 150, 136, 0.56)',
      bottomColor: 'rgba(0, 150, 136, 0.04)',
      lineColor: 'rgba(0, 150, 136, 1)',
      lineWidth: 2,
    });

    // POPULATE CHART WITH DATA
    series.setData(this.prettyChartData);

    function businessDayToString(businessDay: any) {
      return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
    }

    var toolTipWidth = 80;
    var toolTipHeight = 80;
    var toolTipMargin = 15;

    var toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    container.appendChild(toolTip);

    // update tooltip
    this.chart.subscribeCrosshairMove(function(param: { point: { x: number; y: number; }; time: any; seriesPrices: { get: (arg0: any) => any; }; }) {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > container.clientWidth || param.point.y < 0 || param.point.y > container.clientHeight) {
        toolTip.style.display = 'none';
      } else {
        const dateStr = businessDayToString(param.time);
        toolTip.style.display = 'block';
        var price = param.seriesPrices.get(series);
        //@ts-ignore
        var coordinate = series.priceToCoordinate(price);
        var shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(0, Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate));
        var coordinateY = coordinate - toolTipHeight - toolTipMargin > 0 ? coordinate - toolTipHeight - toolTipMargin : Math.max(0, Math.min(container.clientHeight - toolTipHeight - toolTipMargin, coordinate + toolTipMargin));
        toolTip.style.left = shiftedCoordinate + 'px';
        toolTip.style.top = coordinateY + 'px';
        //@ts-ignore
        // toolTip.innerHTML = '<div style="z-index: 99; color: #009688; left:' + toolTip.style.left + '; top:' + toolTip.style.top + '; position: absolute;">Apple Inc.</div><div style="z-index: 99; font-size: 24px; margin: 4px 0px; color: #21384d; left:' + toolTip.style.left + '; top:' + toolTip.style.top + '; position: absolute;">$ ' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' + dateStr + '</div>';
        toolTip.innerHTML = '<div style="z-index: 99; position: absolute; background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 150, 136, 1); width: 96px; height: 80px; padding: 10px; left: '
        + toolTip.style.left
        + '; top: '
        + toolTip.style.top
        + ';"><div style="color: #009688"></div><div style="font-size: 24px; margin: 4px 0px; color: #21384d">$'
        //@ts-ignore
        + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">'
        + dateStr
        + '</div></div>';
        // console.log(toolTip.innerHTML);
      }
  });
    }, 1200);
    this.width=this.grid.nativeElement.offsetWidth-30;
    // console.log(this.cryptoSymbol);

  }


  resizeEvent(event: any){
    // chart.applyOptions({ width: $('#chartDiv').width(), height: $('#chartDiv').height() })
    // console.log(event);
    // console.log(this.el.nativeElement);
    // this.width=this.grid.nativeElement.offsetWidth;
    // console.log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    // console.log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here
    // console.log(this.grid.nativeElement.offsetWidth);
    //@ts-ignore
    // chart.resize(this.grid.nativeElement.offsetWidth, height, true);

    this.chart.resize(this.grid.nativeElement.offsetWidth-30, 500);


    // this.width=this.grid.nativeElement.offsetWidth;
  }
}
