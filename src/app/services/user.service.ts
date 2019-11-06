import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore, private authenticationService: AuthenticationService) { }

  addNewUser(id, name, company, email, password, admin, status) {
    return this.angularFirestore.doc('users/' + id).set({
      id,
      name,
      company,
      email,
      password,
      admin,
      status
    });
  }

  addSurvey(add1) {
    return this.angularFirestore.collection(`users/${sessionStorage.getItem('id')}/survey`).add(add1);
  }

  getUserData() {
    //return this.angularFirestore.doc('users/' + this.authenticationService.userId).valueChanges();
    return this.angularFirestore.doc(`users/${sessionStorage.getItem('id')}`).valueChanges();
  }

  getInfoUser() {
    return this.angularFirestore.collection(`users/${this.authenticationService.userId}`).snapshotChanges();
  }

  getUser() {
    return this.angularFirestore.collection('users').snapshotChanges();
  }

  getUserData1() {
    return this.angularFirestore.doc(`users/${sessionStorage.getItem('id')}`).valueChanges();
  }

  getsurvey() {
    return this.angularFirestore.collection(`users/${sessionStorage.getItem('iDUserSurvey')}/survey`).snapshotChanges();
  }


  updateStatusSurvey(status) {
    return this.angularFirestore.doc(`users/${sessionStorage.getItem('id')}`).update({
      status
    });
  }
}
