import { Injectable } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import {Auth, getAuth, createUserWithEmailAndPassword, UserCredential, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import { Subject } from 'rxjs';


export interface GoogleAuthError {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subject for clients to subscribe to know when a User's Auth State changes
  userAuthSubject = new Subject<boolean>();

  private auth: Auth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = getAuth(this.firebaseService.getApp());
    onAuthStateChanged(this.auth, (user) => {
      this.userAuthSubject.next(!!user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
      } else {
        // User is signed out
        // TODO: Do we route to non-guarded login route?
      }
    });
  }

  /**
   * Create a user in Firebase given an email and password.
   *
   * @param email - Email to associate to new User account
   * @param password - Password to associate to new User Account
   *
   * @returns - UserCredentials of the newly created account.
   */
  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      // This value can be either of type `UserCredential` or `GoogleAuthError`
      return userCredential;
    }).catch((error) => {
      throw error;
    });
  }

  /**
   * Sign in a pre-existing user with email and password.
   *
   * @param email - Email of the User
   * @param password - Password of the User
   *
   * @returns UserCredentials of the logged in user account.
   */
  signInWithEmailAndPassword(email:string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) =>  userCredential)
    .catch((error) => {throw error});
  }
}
