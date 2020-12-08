import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "../../shared/services/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(public afAuth: AngularFireAuth,public router: Router,public afs: AngularFirestore){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
     return this.afAuth.signInWithEmailAndPassword(email, password)
       .then((result) => {
        this.router.navigate(['dashboard']);
         this.SetUserData(result.user);
         if(this.userData){
          localStorage.setItem('user', JSON.stringify(this.userData));
         }
       }).catch((error) => {
         window.alert(error.message)
      })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user===null){
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          return (user) ? true : false;
        }
      })
    }
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
       localStorage.removeItem('user');
       this.router.navigate(['sign-in']);
     })
  }
}
