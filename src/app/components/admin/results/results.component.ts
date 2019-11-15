import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey.interfaces';
import { Router } from '@angular/router';
import nodemailer from 'nodemailer';
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

  returnAdmin() {
    this.router.navigate(['/admin']);
  }
 /* prueba() {
    const nodemailer = require('nodemailer');
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'luismartinezl1896@gmail.com',
        pass: 'telematica1821'
      }
    });
    const mensaje = "hola mundo";
    const mailOptions = {
      from: 'luismartinezl1896@gmail.com',
      to: 'luismartinezlopez1896@gmail.com',
      subject: 'Prueba',
      text: mensaje
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
*/
}
