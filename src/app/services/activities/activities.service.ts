import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  readonly URL_API = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }

  checkActivity(token){ 
    return this.http.post(this.URL_API + '/checkActivity', token);
  }

  numberActivitiesSolved(token){ 
    return this.http.post(this.URL_API + '/numberActivitiesSolved', token);
  }

  getScore(token){ 
    return this.http.post(this.URL_API + '/getScore', token);
  }
}
