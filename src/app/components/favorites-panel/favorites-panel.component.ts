import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';

@Component({
  selector: 'app-favorites-panel',
  templateUrl: './favorites-panel.component.html',
  styleUrls: ['./favorites-panel.component.scss']
})
export class FavoritesPanelComponent implements OnInit {

  constructor(public favorite: AuthenticationService) { }
  favorites: any[] = [];

  ngOnInit(): void {
    this.favorite.GetFavorites().subscribe(data=>{
      // console.log();
      data.forEach((doc: any) => {
        // console.log(doc, '=>', doc.data());
        this.favorites.push(doc.data());
      });
      console.log(this.favorites);
      console.log('favs');
    });
  }

}
