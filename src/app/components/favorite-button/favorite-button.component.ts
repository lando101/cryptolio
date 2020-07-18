import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  constructor() { }
  @Output() favoriteChange = new EventEmitter();
  ngOnInit(): void {
  }

  // $('a.like-button').on('click', function(e) {
  //   $(this).toggleClass('liked');

  //   setTimeout(() => {
  //     $(e.target).removeClass('liked')
  //   }, 1000)
  // });

  favorite(){
    document.getElementById('favorite').classList.add("liked");
    this.favoriteChange.emit(true);
  }
}
