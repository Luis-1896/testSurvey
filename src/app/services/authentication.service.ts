import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User>;
  user1: Observable<firebase.User>;
  userId: string = '';
  userIdAdmin: string = '';
  emailUser = '';
  passwordUser: string;
  previuosUser: string;

  constructor(private angularFireAuth: AngularFireAuth) {

    this.user = angularFireAuth.user;
    this.user1 = angularFireAuth.user;
    this.userId=sessionStorage.getItem('id');
 }

  signup(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).
      then(() => {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        /*this.user.subscribe(user => {
          sessionStorage.setItem('id', user.uid);
          this.userId = sessionStorage.getItem('id');
          console.log(`${this.userId}`);
        });*/
      }).catch(err => console.log(err));
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        sessionStorage.clear();
      }).catch(err => console.log(err));
  }
  /*
    login(email, password) {
      return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        resolve(false);
      });
    }
  
    logout() {
      this.angularFireAuth.auth.signOut()
      .then(() => {
          sessionStorage.clear();
      })
      .catch(() => {});
      return 
    }
  
    logInWithPreviousUser() {
      const email = sessionStorage.getItem('email');
      const password = sessionStorage.getItem('password');
      this.login(email, password);
    }
  */
}
