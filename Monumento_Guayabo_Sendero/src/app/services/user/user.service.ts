import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }

  insertUser(token){ 
    return this.http.post(this.URL_API + '/addNewUser', token);
  }
}
