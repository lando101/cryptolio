import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  like: boolean = false;

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
    // document.getElementById('favorite').classList.add("liked");
    if(this.like === false){
      this.like = true;
    } else{
      this.like = true;
    }
    this.favoriteChange.emit(true);


  }
}
