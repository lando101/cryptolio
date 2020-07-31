import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsApiService } from '@app/services/news-api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.scss']
})
export class NewsResultsComponent implements OnInit {
  [x: string]: any;

  constructor(private newsService: NewsApiService) {
    setTimeout(() => {
      this.filteredCategories = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((category: string | null) => category ? this._filter(category) : this.newsCategories.slice()));
    }, 500);
  }
  newsResults: any = "";
  newsCategories: string[] = [];
  tiltSettings: any;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  filteredCategories: Observable<string[]>;
  category: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    // console.log('FILTERED LIST');
    // console.log(this.filteredCategories);
    this.newsService.getCoinNews().subscribe(data => {
      this.newsResults = data;
      // console.log(this.newsResults);
    });

    this.newsService.getCoinCategories().subscribe(data => {

        data.forEach((element: any) => {
          this.newsCategories.push(element.categoryName)
        });
        // this.newsCategories.push(data.categoryName);
        // console.log(data);
        // console.log(this.newsCategories);
    });

    this.tiltSettings =
    {
      reverse: true,  // reverse the tilt direction
      max: 35,     // max tilt rotation (degrees)
      startX: 0,      // the starting tilt on the X axis, in degrees.
      startY: 0,      // the starting tilt on the Y axis, in degrees.
      perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
      scale: 1.1,      // 2 = 200%, 1.5 = 150%, etc..
      speed: 800,    // Speed of the enter/exit transition
      transition: true,   // Set a transition on enter/exit.
      axis: null,   // What axis should be disabled. Can be X or Y.
      reset: true,    // If the tilt effect has to be reset on exit.
      easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
      glare: true,  // if it should have a "glare" effect
      "max-glare": .1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.category.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.category.indexOf(fruit);

    if (index >= 0) {
      this.category.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.category.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.newsCategories.filter(category => category.toLowerCase().indexOf(filterValue) === 0);
  }
}
