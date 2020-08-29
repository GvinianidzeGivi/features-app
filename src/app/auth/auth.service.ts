import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   apiUrl = 'http://localhost:3000/api/v1/user'

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(`${this.apiUrl}/signup`, authData)
      .subscribe(response => {
        console.log(response);
      })
    }

    login(email: string, password: string) {
      const authData: AuthData = {email: email, password: password};
      this.http.post(`${this.apiUrl}/login`, authData)
      .subscribe(response => {
        console.log(response);
      })
    }

  }
