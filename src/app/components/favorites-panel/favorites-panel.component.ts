import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CryptoDialogComponent } from '../crypto-dialog/crypto-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-favorites-panel',
  templateUrl: './favorites-panel.component.html',
  styleUrls: ['./favorites-panel.component.scss']
})
export class FavoritesPanelComponent implements OnInit {

  constructor(public favorite: AuthenticationService, public dialog: MatDialog) {
    // form
  }
  favorites: any[] = [];
  tiltSettingsFav: any;
  ngOnInit(): void {
    this.tiltSettingsFav =
    {
      reverse: true,  // reverse the tilt direction
      max: 10,     // max tilt rotation (degrees)
      startX: 0,      // the starting tilt on the X axis, in degrees.
      startY: 0,      // the starting tilt on the Y axis, in degrees.
      perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
      scale: 1.02,      // 2 = 200%, 1.5 = 150%, etc..
      speed: 800,    // Speed of the enter/exit transition
      transition: true,   // Set a transition on enter/exit.
      axis: null,   // What axis should be disabled. Can be X or Y.
      reset: true,    // If the tilt effect has to be reset on exit.
      easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
      glare: true,  // if it should have a "glare" effect
      "max-glare": .1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    }

    this.favorite.GetFavorites().subscribe(data=>{
      // console.log();
      data.forEach((doc: any) => {
        // console.log(doc, '=>', doc.data());
        this.favorites.push(doc.data());
      });
      // console.log(this.favorites);
      // console.log('favs');
    });

    // START SERVICE TO GET REAL TIME UPDATES
    this.favorite.GetRealTimeFavorites();

    // RECEIVE THE REALTIME UPDATES
    this.favorite.returnRealTimeFavs().subscribe(data=>{
      // console.log("WE GOT SOME DATA");
      // console.log(data);
      // if(data.length > this.favorites.length){
      //   // this.favorites.push(data[0]);
      //   data.sort((a:any, b:any) => b.timestamp - a.timestamp)
      //   this.favorites.sort((a:any, b:any) => b.timestamp - a.timestamp);
      //   console.log("DATA");
      //   console.log(data);
      //   console.log('FAVORITES LIST');
      //   console.log(this.favorites);

      //   for (let index = 0; index < data.length; index++) {
      //     // const element = array[index];
      //     if(data[index].name !== this.favorites[index].name){
      //       // this.favorites.push(data[index]);
      //       console.log(index);
      //     }
      //   }

      // }

      this.favorites = [];
      this.favorites = data;
    })

    // this.favorite.ReturnRealTimeFavs().subscribe(data=>{
    //   console.log('FAV PANEL')
    //   console.log(data);
    //   console.log('FAV PANEL')
    // });
  }

  deleteFav(favName: string){
    this.favorite.PrepDeleteFavorites(favName);
  }

  openDialog(crypto:any): void {
    // if(!this.favoritedCoin){
      console.log('TRIED TO OPEN DIALOG');
      let dialogRef = this.dialog.open(CryptoDialogComponent, {
        // width: '250px',
        data: { name: crypto.name, price: crypto.price, rank: crypto.rank, id: crypto.id,
          logo: crypto.logo_url, prct: crypto.oneDayChange, market_cap: crypto.market_cap,
          max_supply: crypto.max_supply, circulating_supply: crypto.circulating_supply,
          ath: crypto.high }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
    // }

  }

}
