import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<any>(false);
  private apiUrl = 'http://localhost:3000/user';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.loggedIn.next(isLoggedIn && isLoggedIn === 'true');
  }
  login() {
    this.loggedIn.next(true); 
    localStorage.setItem('isLoggedIn', 'true'); 
  }
  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
  registerUser(user: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.apiUrl, user);
  }
   getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }
}