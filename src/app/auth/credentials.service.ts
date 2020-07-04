import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: Credentials | null = null;
  private authenticated: boolean = false;
  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    // return !!this.credentials;
    console.log(this.authenticated + ' : Authentication status');
    return this.authenticated;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */

   // NOT USING CREDENTIALS RIGHT NOW :: USING SIMPLE TRUE FALSE IF AUTHENTICATED
  setCredentials(authenticationStatus: boolean) {
    // this._credentials = credentials || null;

    if (authenticationStatus) {
      // const storage = remember ? localStorage : sessionStorage;
      // storage.setItem(credentialsKey, JSON.stringify(credentials));
      this.authenticated = authenticationStatus;
    } else {
      // sessionStorage.removeItem(credentialsKey);
      // localStorage.removeItem(credentialsKey);
      this.authenticated = authenticationStatus;
    }
  }
}
