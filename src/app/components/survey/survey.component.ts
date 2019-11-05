import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey.interfaces';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  optionSelect: string;
  typeOption = [
    'good',
    'bad'
  ];
  statusSurvey: boolean;
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  survey(form) {
    const data: Survey = form.value;
    data.answer3 = this.optionSelect;
    this.statusSurvey = true;


    this.userService.addSurvey(data)
      .then(() => {
        this.userService.updateStatusSurvey(this.statusSurvey);

        this.authenticationService.logout()
          .then(() => {
            this.router.navigate(['/']);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

}
