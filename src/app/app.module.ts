import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
    AngularFireModule.initializeApp(firebaseConfig),
    // NewsComponent,
    // IonicModule,
    // IonSearchbar,
    CommonModule,
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
    // IonSearchbar,
  ],
  providers: [AuthenticationService],
  entryComponents: [NewsDialogComponent,],
  bootstrap: [AppComponent],
})
export class AppModule {}
