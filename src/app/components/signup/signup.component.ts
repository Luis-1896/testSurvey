import { Component, OnInit } from '@angular/core';
import { User } from './../../interfaces/user.interface';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private hidePassword = true;
  private hidePasswordRepeat = true;
  private errorMessage: string = '';

  isSuperAdmin = false;
  isAdmin = false;
  newAdmin = false;
  emailUser: string;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(data => {
      if (data['superadmin']) {
        this.newAdmin = true;
        //this.isSuperAdmin = true;
      } else {
        this.newAdmin = false;

      }
    });
  }
  /*
    test() {
      const docRef = this.angularFirestore.collection(`users/ ${this.authenticationService.userId}`);
  
      docRef.get().then(doc => {
          if (doc.exists) {
              console.log('Document data:', doc.data());
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  */
  signup(form) {
    let data: User = form.value;
    data.admin = this.newAdmin;
    data.status = false;
    this.authenticationService.signup(data.email, data.password)
      .then(reault => {
        this.errorMessage = '';
        this.userService.addNewUser(reault.user.uid, data.name, data.company, data.email, data.password, data.admin, data.status);
        /*this.angularFireAuth.auth.signOut().then(() => {
          console.log('adios');
          this.authenticationService.login(sessionStorage.getItem('email'), sessionStorage.getItem('password'));

        }).catch(err => console.log(err));*/

        /*.then(()=>{
          this.router.navigate(['signup']);
        }).catch(err => console.log('error',err));*/
      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }

}
