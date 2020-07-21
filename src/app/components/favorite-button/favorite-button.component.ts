import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {

  like: boolean = false;

  constructor(public favoriteService: AuthenticationService) { }
  @Output() favoriteChange = new EventEmitter();
  @Input() cypto: any;
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
    this.favoriteService.SetFavorites(this.cypto);
    // console.log(this.cypto);

    if(this.like === false){
      this.like = true;
    } else{
      this.like = true;
    }
    this.favoriteChange.emit(true);
  }
}
