import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  usua = '';
  ngOnInit() {
  }

  login(form) {
    let data = form.value;
    this.authenticationService.login(data.email, data.password)
      .then(() => {
        /* this.authenticationService.user.subscribe(user => {
           sessionStorage.setItem('id', user.uid);
         });*/
        this.authenticationService.user.subscribe(user => {
          sessionStorage.setItem('id', user.uid);
          this.usua=sessionStorage.getItem('id');
          //this.authenticationService.userId = user.uid;
          console.log(`${this.usua}`);
        });

        this.router.navigate(['/survey']).then(()=>{
          location.reload(true)
        }).catch(err=>console.log(err));
        
      })
      .catch(err => console.log(err));
  }

}
