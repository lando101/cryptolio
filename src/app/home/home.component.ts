import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { createChart } from 'lightweight-charts';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService,) {
    // const chart = createChart(document.body, {
    //   width: 400,
    //   height: 300,
    //   layout:{
    //     backgroundColor: '#131722',
    //     textColor: '#d1d4dc'
    //   },
    //   grid:{
    //     vertLines: {
    //       color: 'rgba(42, 46, 57, 0)'
    //     },
    //     horzLines: {
    //       color: 'rgba(42, 46, 57, 0.6)',
    //     }
    //   }
    // });
// const lineSeries = chart.addLineSeries();
// lineSeries.setData([
//     { time: '2019-04-11', value: 80.01 },
//     { time: '2019-04-12', value: 96.63 },
//     { time: '2019-04-13', value: 76.64 },
//     { time: '2019-04-14', value: 81.89 },
//     { time: '2019-04-15', value: 74.43 },
//     { time: '2019-04-16', value: 80.01 },
//     { time: '2019-04-17', value: 96.63 },
//     { time: '2019-04-18', value: 76.64 },
//     { time: '2019-04-19', value: 81.89 },
//     { time: '2019-04-20', value: 74.43 },
// ]);
  }

  ngOnInit() {
    this.isLoading = true;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
  }
}
