import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  surveyprueba: Survey[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getsurvey().subscribe(sur => {
      this.surveyprueba = sur.map(pru => {
        return {
          id: pru.payload.doc.id,
          ...pru.payload.doc.data()
        }
      });
    });
  }

  returnAdmin(){
    this.router.navigate(['/admin']);
  }

}
