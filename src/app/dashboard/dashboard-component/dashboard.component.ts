import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { DashboardService } from '../services/dashboard.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newCases: number = 0;
  cumulativeCount: number = 0;
  recoveries: number = 0;
  mortality: number = 0;
  currenlyInfected: number = 0;
  underObservation: number = 0;
  pcrToday: number = 0;

  lastUpdatedOn: string = "";
  underObservationChartData = [];
  isLoaded: boolean;

  constructor(private dashboardSrv: DashboardService) { }

  ngOnInit() {
    this.getCovidData();
  }

  getCovidData() {
    this.dashboardSrv.getCovidData().subscribe(resp => {
     if(resp.success) {
       localStorage.setItem('covid-data', JSON.stringify(resp.data));
     }
     this.reflectCovidData();
     this.loadUnderObservationChart();
    }, error => {
      console.log(error);
      this.reflectCovidData();
      this.loadUnderObservationChart();
      throw error;
    })
  }

  reflectCovidData() {
    let data = JSON.parse(localStorage.getItem('covid-data'));
    if(data) {
      this.isLoaded = true;
      this.newCases = data.local_new_cases;
      this.cumulativeCount = data.local_total_cases;
      this.recoveries = data.local_recovered;
      this.mortality = data.local_deaths;
      this.currenlyInfected = data.local_active_cases;
      this.underObservation = data.local_total_number_of_individuals_in_hospitals;
      this.pcrToday = data.daily_pcr_testing_data[data.daily_pcr_testing_data.length-1].count;

      this.lastUpdatedOn = data.update_date_time;
      
      data.hospital_data.forEach(hospitalData => {
        if(hospitalData.treatment_total != 0) {
          this.underObservationChartData.push({ y: hospitalData.treatment_total, name: hospitalData.hospital.name});
        }
      });
    } else {
      this.isLoaded = false;
    }
  }

  loadUnderObservationChart() {
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Under Observation"
        },
        data: [{
          type: "pie",
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: this.underObservationChartData
      }]
    });
    if(chart) {
      chart.render();
    }
  }

}
