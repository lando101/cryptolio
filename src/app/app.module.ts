import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule, AuthenticationService } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AngularTiltModule } from 'angular-tilt';


// FIREBASE IMPORTS
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './home/home.component';


// IONIC IMPORTS
// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './components/news/news.component';
import { RedditSearchComponent } from './components/reddit-search/reddit-search.component';
import { RedditResultsComponent } from './components/reddit-results/reddit-results.component';
import { NewsDialogComponent } from './components/news-dialog/news-dialog.component';
import { SafePipe } from './pipes/sanitizer.pipe';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';
import { MarketCapChartComponent } from './components/market-cap-chart/market-cap-chart.component';
import { CryptoDialogComponent } from './components/crypto-dialog/crypto-dialog.component';
import { CryptoLineChartComponent } from './components/crypto-line-chart/crypto-line-chart.component';
import { FavoritesPanelComponent } from './components/favorites-panel/favorites-panel.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { NewsResultsComponent } from './components/news-results/news-results.component';
import { TopCoinsComponent } from './components/top-coins/top-coins.component';
import { TopGainersComponent } from './components/top-gainers/top-gainers.component';
import { TopLosersComponent } from './components/top-losers/top-losers.component';
import { MarketSummaryComponent } from './components/market-summary/market-summary.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { CoinCommentsComponent } from './components/coin-comments/coin-comments.component';

// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAk62hJfJnCotlDM1diCWrE0FIF_VSGGFA",
  authDomain: "crryptolio.firebaseapp.com",
  databaseURL: "https://crryptolio.firebaseio.com",
  projectId: "crryptolio",
  storageBucket: "crryptolio.appspot.com",
  messagingSenderId: "678786957358",
  appId: "1:678786957358:web:46d75b53dcf095ade25fbf",
  measurementId: "G-PQG2PVHFXS"
};

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    AuthModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ChartsModule,
    NgxTwitterTimelineModule,
    AngularTiltModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // NewsComponent,
    // IonicModule,
    // IonSearchbar,
    CommonModule,
    // SlickCarouselModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent,
    NewsComponent,
    RedditSearchComponent,
    RedditResultsComponent,
    NewsDialogComponent,
    SafePipe,
    CryptoListComponent,
    MarketCapChartComponent,
    CryptoDialogComponent,
    CryptoLineChartComponent,
    FavoritesPanelComponent,
    FavoriteButtonComponent,
    NewsResultsComponent,
    TopCoinsComponent,
    TopGainersComponent,
    TopLosersComponent,
    MarketSummaryComponent,
    AnnouncementsComponent,
    CoinCommentsComponent,
    // IonSearchbar,
  ],
  providers: [AuthenticationService],
  entryComponents: [NewsDialogComponent, CryptoDialogComponent ],
  bootstrap: [AppComponent],
})
export class AppModule {}
