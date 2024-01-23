import { Injectable } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';
import {Auth, getAuth, createUserWithEmailAndPassword, UserCredential, onAuthStateChanged, User} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subject for clients to subscribe to know when a User's Auth State changes
  userAuthSubject = new BehaviorSubject<boolean>(false);

  private auth: Auth;
  private user: User|undefined;

  constructor(private readonly firebaseService: FirebaseService) {
    this.auth = getAuth(this.firebaseService.getApp());
    onAuthStateChanged(this.auth, (user) => {
      this.userAuthSubject.next(!!user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        this.user = user;
        console.log('we got an auth user');
      } else {
        // User is signed out
        this.user = undefined;
        console.log('we do not have an auth user');

        // TODO: Do we route to non-guarded login route?
      }
    });
  }

  /**
   * Create a user in Firebase given an email and password.
   * @param email - Email to associate to new User account
   * @param password - Password to associate to new User Account
   */
  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential|{code: string, message: string}> {
    return createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      // This success block should in turn trigger the `onAuthStateChanged` event.
      console.log(userCredential.operationType);
      return userCredential;
    }).catch((error) => {
      return error;
    });
  }

  /**
   * Get the current User information for the logged in User. Will throw an error when a User has not yet logged in.
   * @returns The User object
   */
  getCurrentUser(): User {
    if(!!this.user) {
      return this.user;
    }
    throw 'User not logged in';
  }
}
