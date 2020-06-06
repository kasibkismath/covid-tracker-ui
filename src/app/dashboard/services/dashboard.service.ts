import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getCovidData() : Observable<any> {
    return this.http.get(APP_CONFIG.DASHBOARD_SERVICES.GET_COVID_DATA);
  }
}
