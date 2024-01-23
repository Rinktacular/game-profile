import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyD7sMQ1ylsdG4HJwYxhhptrenqBAPeN6OM",
    authDomain: "gaming-profile-app.firebaseapp.com",
    projectId: "gaming-profile-app",
    storageBucket: "gaming-profile-app.appspot.com",
    messagingSenderId: "541233666493",
    appId: "1:541233666493:web:ee5fe3c56d65910b311ad4",
    measurementId: "G-5XNZ3L4ZGV"
  };

  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
   }

   /**
    * Get a reference to the instantiated Firebase App.
    *
    * @returns The Firebase App
    */
  getApp(): FirebaseApp {
    if (!!this.app) {
      return this.app;
    }
    throw 'Firebase App not initialized';
  }
}
