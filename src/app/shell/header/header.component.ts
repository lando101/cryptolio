import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Client } from 'node_modules/coinbase/lib/model/'
import { AuthenticationService, CredentialsService } from '@app/auth';
import { CoinmarketcapApiService } from '@app/services/coinmarketcap-api.service';
import { User } from '@app/model/user.model';
import { ThemeService } from '@app/services/theme.service';

declare var Client: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  marketCap: number = 0;
  userInfo: User;
  themeType = '';
  // Client = require('coinbase').Client;
  // client = new Client({'apiKey': 61651, 'apiSecret': 51651});
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private cryptoData: CoinmarketcapApiService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // this.themeService.getTheme().subscribe(data =>{
    //   // this.themeType = data;
    //   console.log(this.themeType);
    //   console.log('HEADER THEME!!!!!!!!!!');
    // });

    this.themeService.themeTypeBS.subscribe((data: string)=>{
      console.log(data + 'THEME!!!!');
      this.themeType = data;
    });

    this.cryptoData.getMarketCap().subscribe(data =>{
      // console.log("HEADER GOT THE GOODS");
      this.marketCap = data;
    });

    this.authenticationService.GetUserData().subscribe(data=>{
      if(data){
        this.userInfo = data;
        // console.log(data);
        // console.log("USER DATA");
      }
    });
  }

  setTheme(){
    let theme = this.themeType;
    if(theme === 'dark'){
      theme = 'light'
      this.themeService.setTheme(theme);
    } else{
      theme = 'dark';
      this.themeService.setTheme(theme);
    }
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
