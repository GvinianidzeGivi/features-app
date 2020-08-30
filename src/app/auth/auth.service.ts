import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatus = new Subject<boolean>();
    private apiUrl = 'http://localhost:3000/api/v1/user'

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    const authData: AuthData = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    };
    this.http.post(this.apiUrl + '/signup', authData).subscribe(
      response => {
        this.router.navigate(['/']);
      },
      error => {
        this.authStatus.next(false);
      }
    );
  }

    login(email: string, password: string) {
      const authData: AuthData = {email: email, password: password};
      this.http.post<{token: string}>(`${this.apiUrl}/login`, authData)
      .subscribe(response => {
          const token = response.token;
                this.token = token;
      })
    }

    private clearAuthData() {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
    }

    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatus.next(false);
      this.userId = null;
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
    }

  }
