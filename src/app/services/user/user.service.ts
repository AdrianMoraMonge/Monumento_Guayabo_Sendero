import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = 'https://sendero-guayabo.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  insertUser(token){ 
    return this.http.post(this.URL_API + '/addNewUser', token);
  }
}
