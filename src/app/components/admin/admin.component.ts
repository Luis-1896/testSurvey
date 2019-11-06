import { Prueba } from './../../interfaces/prueba.interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Survey1 } from 'src/app/interfaces/survey1.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Survey } from 'src/app/interfaces/survey.interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminComponent implements OnInit {

  panelOpenState: boolean;
  prue: Prueba[] = [];
  surveyprueba: Survey[] = [];
  prueObservable: Subscription;





  //dataSource = this.prue;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUser().subscribe(cart => {
      this.prue = cart.map(prueba => {
        return {
          id: prueba.payload.doc.id,
          ...prueba.payload.doc.data()
        }
      });
    });



  }


  info(index) {
    console.log(`${this.prue[index].id}`);
    sessionStorage.setItem('iDUserSurvey', this.prue[index].id);
   // console.log(`${sessionStorage.getItem('iDUserSurvey')}`);
    this.router.navigate(['/results']);

    /*this.userService.getsurvey(this.prue[index].id).subscribe(sur => {
      this.surveyprueba = sur.map(pru => {
        return {
          id: pru.payload.doc.id,
          ...pru.payload.doc.data()
        }
      })
    });*/

  }
}


