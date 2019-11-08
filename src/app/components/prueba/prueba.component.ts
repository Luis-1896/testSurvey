import { Prueba } from './../../interfaces/prueba.interfaces';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interfaces/survey.interfaces';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  prue: Prueba[] = [];
  surveyprueba: Survey[] = [];
  contestado = 0;
  nocontestado = 0;



  //Doughnut
  public doughnutChartLabels: Label[] = ['Contestado', 'No contestado'];
  public doughnutChartData: MultiDataSet = [
    [0, 0]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: ['rgba(0, 0, 255, 0.8)', 'rgba(255, 0, 0, 0.8)'],
    },
  ];

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
    console.log(`${index}`);
    console.log(`${this.prue[index].id}`);
    console.log(`${this.prue.length}`);//solo para ver cuantos usuarios hay en totalidad
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
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public actualizar() {

    for (const i in this.prue) {
      if (this.prue[i].admin === false) {
        if (this.prue[i].status === true) {
          this.contestado = this.contestado + 1;
          console.log(`Contestado, ${this.prue[i].name}, ${this.contestado}`);
        } else {
          this.nocontestado = this.nocontestado + 1;
          console.log(`No conestado, ${this.prue[i].name}, ${this.nocontestado}`);
        }

      }

    }
    
    this.doughnutChartData = [[this.contestado, this.nocontestado]];
  }


}
