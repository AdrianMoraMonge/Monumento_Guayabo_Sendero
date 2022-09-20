import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  readonly URL_API = 'https://sendero-guayabo.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  checkFirstActivity(token){ 
    return this.http.post(this.URL_API + '/checkFirstActivity', token);
  }

  numberActivitiesSolved(token){ 
    return this.http.post(this.URL_API + '/numberActivitiesSolved', token);
  }
}
