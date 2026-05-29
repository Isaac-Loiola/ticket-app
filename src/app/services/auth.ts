import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token:string;
}

export interface LoginDTO{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private url =  "http://localhost:5210/api/user/auth";

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(email:string, password:string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url, {email, password})
    .pipe(
      tap( response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(){
    localStorage.getItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

}
