import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean = false;
  isClient: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  usuari = '';
  usuario = '';
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router,
    private angularFiretore: AngularFirestore,) { }

  ngOnInit() {
    
    this.authenticationService.user.subscribe(user => {
      
      if (user) {
        this.isClient = true;
        //console.log(`${user}`);
        //console.log(`${sessionStorage.getItem('id')}`)
        //this.authenticationService.userId = user.uid;
        //this.authenticationService.userId = sessionStorage.getItem('id');
       // sessionStorage.setItem('id', user.uid);
       // console.log(`${sessionStorage.getItem('id')}`);
        //this.usuario=user.uid;//solo sirve para ver que no se sale del usuario

        const usuari = sessionStorage.getItem('email');
        const usuari1 = sessionStorage.getItem('password');
        const usuari2 = this.authenticationService.userId;
        this.usuario = usuari;
        console.log(`${usuari}, ${usuari1}, ${usuari2}`);
       /* this.angularFiretore.doc(`users/${sessionStorage.getItem('id')}`).valueChanges().subscribe(user =>{
            console.log(`${sessionStorage.getItem}`)
        });*/
        
        this.userService.getUserData().subscribe(data => {
         
          if (data['admin']) {
            this.isAdmin = true;
          }
          if (data['superadmin']) {
            this.isSuperAdmin = true;
          }
          
        })
      }
      else {
        this.isClient = false;
        this.authenticationService.userId = '';
      }
    });
  }

  logout() {
    this.isClient = false;
    this.isAdmin = false;
    this.isSuperAdmin = false;
    this.authenticationService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }


}
