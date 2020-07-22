import { Injectable, NgZone  } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { User } from '@app/model/user.model';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from "@angular/router";
import { auth } from 'firebase/app';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any; // Save logged in user data

  // constructor(private credentialsService: CredentialsService) {}
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private credentialsService: CredentialsService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

// Sign in with email/password
SignIn(email: any, password: any) {
  return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result: { user: User; }) => {
      this.ngZone.run(() => {
        // this.router.navigate(['dashboard']);
        console.log("AUTORIZED TO LOGIN");
        this.credentialsService.setCredentials(true);

        this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        // this.login(email);
      });
      this.SetUserData(result.user);
      // this.GetFavorites();
      // this.SetFavorites('XRP');
    }).catch((error: { message: any; }) => {
      window.alert(error.message);
      console.log("NOT AUTHORIZED TO LOGIN");
      this.credentialsService.setCredentials(false);
    })
}

/* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      // favorites: user.favorites = ["XRP"]
    }
    return userRef.set(userData, {
      merge: true
    })
  }


   // Sign out
   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      // this.router.navigate(['sign-in']);
    })
  }





  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: '123456',
    };
    // this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials(false);
    this.SignOut();
    return of(true);
  }



  SetFavorites(crypto?: any){
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userRef: AngularFirestoreCollection<any> = this.afs.collection(`users/${this.userData.uid}/favorites`)
    const favorite: any = {
      // uid: this.userData.uid,
      // email: this.userData.email,
      // displayName: this.userData.displayName,
      // photoURL: this.userData.photoURL,
      // emailVerified: this.userData.emailVerified,
      // favorites: ['btc']
      name: crypto.symbol,
      thumbnail: crypto.logo_url,
      price: crypto.price,
      timestamp: crypto.price_timestamp
    }
    userRef.add(favorite)
  }

  GetFavorites(): Observable<any>{
    const userRef: AngularFirestoreCollection<any> = this.afs.collection(`users/${this.userData.uid}/favorites/`);
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userData.uid}`);

    // console.log(userRef.get())
    const favorites =  userRef.get();

    return favorites;
    // userRef.get();
  }

  GetComments(): Observable<any>{
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/btc/coin_comments`);
    const coin = coinRef.snapshotChanges();

    console.log(coin);
    console.log('comment service')
    // const coin = coinRef.get();

    // doc.onSnapshot(docSnapshot => {
    //   console.log(`Received doc snapshot: ${docSnapshot}`);
    //   // ...
    // }, err => {
    //   console.log(`Encountered error: ${err}`);
    // });

    return coin;
  }
}
