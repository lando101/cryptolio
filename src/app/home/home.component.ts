import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { createChart } from 'lightweight-charts';

import { QuoteService } from './quote.service';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService,
    private cmcService: CoinmarketcapApiService,) {
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

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit() {
    this.isLoading = true;
    this.cmcService.getCryptoData().subscribe(data => {
      console.log(data);
    });


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
