import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Client } from 'node_modules/coinbase/lib/model/'
import { AuthenticationService, CredentialsService } from '@app/auth';

declare var Client: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  // Client = require('coinbase').Client;
  // client = new Client({'apiKey': 61651, 'apiSecret': 51651});
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {}

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
