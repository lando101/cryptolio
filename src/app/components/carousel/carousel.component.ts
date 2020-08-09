import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  themeType = ''
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
    });

    console.log(this.themeType);
    console.log('THEME');

  }

}
